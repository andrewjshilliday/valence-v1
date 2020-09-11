package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/andrewjshilliday/valence-api/functions/genius/model"
	"github.com/andrewjshilliday/valence-api/functions/genius/repository"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/gorilla/mux"
)

// Handler function for AWS lambda routing
func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch request.HTTPMethod {
	case "GET":
		id := request.QueryStringParameters["id"]
		artist := request.QueryStringParameters["artist"]
		song := request.QueryStringParameters["song"]
		includeLyrics, _ := strconv.ParseBool(request.QueryStringParameters["includeLyrics"])
		refreshLyrics, _ := strconv.ParseBool(request.QueryStringParameters["refreshLyrics"])

		return GetSong(id, artist, song, includeLyrics, refreshLyrics)
	default:
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Content-Type":                "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
			},
			StatusCode: 405,
		}, nil
	}
}

type Client struct {
	AccessToken string
	client      *http.Client
}

const (
	baseURL     string = "https://api.genius.com"
	accessToken string = os.Getenv("GENIUS_TOKEN")
)

func NewClient(httpClient *http.Client) *Client {
	if httpClient == nil {
		httpClient = http.DefaultClient
	}

	c := &Client{AccessToken: accessToken, client: httpClient}
	return c
}

func (c *Client) doRequest(req *http.Request) ([]byte, error) {
	req.Header.Set("Authorization", "Bearer "+c.AccessToken)
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if 200 != resp.StatusCode {
		return nil, fmt.Errorf("%s", body)
	}

	return body, nil
}

func GetSong(id string, artist string, song string, includeLyrics bool, refreshLyrics bool) (events.APIGatewayProxyResponse, error) {
	response, _ := repository.Get(id)
	var updateRequired bool

	if response != nil {
		if !includeLyrics || (len(response.Response.Song.Lyrics) > 0) && !refreshLyrics {
			data, _ := json.Marshal(&response.Response)

			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Content-Type":                "application/json; charset=UTF-8",
					"Access-Control-Allow-Origin": "*",
				},
				Body:       string(data),
				StatusCode: 200,
			}, nil
		}

		updateRequired = true
	}

	c := NewClient(nil)

	resp, err := c.Search(artist + " " + song)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Content-Type":                "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
			},
			StatusCode: 404,
		}, nil
	}

	songMatch := FindSongMatch(resp.Response.Hits, artist, song)

	if songMatch == nil {
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Content-Type":                "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
			},
			StatusCode: 404,
		}, nil
	}

	url := fmt.Sprintf(baseURL + "/songs/" + strconv.Itoa(songMatch.Result.ID))
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		panic(err)
	}

	q := req.URL.Query()
	q.Add("text_format", "plain")
	req.URL.RawQuery = q.Encode()

	bytes, err := c.doRequest(req)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Content-Type":                "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
			},
			StatusCode: 404,
		}, nil
	}

	err = json.Unmarshal(bytes, &response)
	if err != nil {
		panic(err)
	}

	if includeLyrics {
		response.Response.Song.Lyrics = RetrieveLyrics(strconv.Itoa(response.Response.Song.ID), response.Response.Song.WriterArtists)
	}

	if updateRequired {
		repository.Put(id, response)
	} else {
		repository.Post(id, artist, song, response)
	}

	data, _ := json.Marshal(&response.Response)

	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                "application/json; charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
		},
		Body:       string(data),
		StatusCode: 200,
	}, nil
}

func (c *Client) Search(q string) (*model.Response, error) {
	url := fmt.Sprintf(baseURL + "/search")

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	var reg = regexp.MustCompile(`\((.+?)\)|\[(.+?)\]|{(.+?)}`)
	q = reg.ReplaceAllString(q, "")
	q = strings.Trim(q, " ")

	getParams := req.URL.Query()
	getParams.Add("q", q)
	req.URL.RawQuery = getParams.Encode()

	bytes, err := c.doRequest(req)
	if err != nil {
		return nil, err
	}

	var response model.Response
	err = json.Unmarshal(bytes, &response)
	if err != nil {
		return nil, err
	}

	return &response, nil
}

func GetLyrics(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	lyrics := RetrieveLyrics(id, nil)
	data, _ := json.Marshal(lyrics)

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
	return
}

func RetrieveLyrics(id string, writtenBy []*model.Artist) string {
	var lyrics string

	resp, err := http.Get("https://genius.com/songs/" + id + "/embed.js")
	if err != nil {
		lyrics = "Lyrics unavailable"
		return lyrics
	}

	body, err := ioutil.ReadAll(resp.Body)
	lyrics = string(body[:])

	if len(lyrics) == 0 || lyrics == " " {
		lyrics = "Lyrics unavailable"
		return lyrics
	}

	var reg = regexp.MustCompile(`.+?('\)\) {)`)
	lyrics = reg.ReplaceAllString(lyrics, ``)
	reg = regexp.MustCompile(`.+?(type="text\/css" \/>'\))`)
	lyrics = reg.ReplaceAllString(lyrics, ``)
	reg = regexp.MustCompile(`.+?(rg_embed_body\\\\\\">)`)
	lyrics = reg.ReplaceAllString(lyrics, ``)
	reg = regexp.MustCompile(`.+?(<\\\/div>)`)
	lyrics = reg.FindString(lyrics)
	reg = regexp.MustCompile(`<[^>]*>`)
	lyrics = reg.ReplaceAllString(lyrics, ``)
	reg = regexp.MustCompile(`(.*?  )`)
	lyrics = reg.ReplaceAllString(lyrics, ``)
	lyrics = strings.Replace(lyrics, "\\n", "|n", -1)
	lyrics = strings.Replace(lyrics, "\\", "", -1)
	lyrics = strings.Replace(lyrics, "|n", "\n", -1)
	lyrics = strings.Replace(lyrics, "&amp;", "&", -1)
	lyrics = strings.Trim(lyrics, "\n")

	if len(writtenBy) > 0 {
		lyrics += "\n\nWritten By:\n"

		for _, writer := range writtenBy {
			lyrics += writer.Name
			if writer.Name != writtenBy[len(writtenBy)-1].Name {
				lyrics += ", "
			}
		}
	}

	return lyrics
}

func FindSongMatch(hits []*model.Hit, artist string, song string) *model.Hit {
	artist = strings.ToLower(artist)
	song = strings.ToLower(song)
	var hitArtist, hitSong string

	for _, hit := range hits {
		hitArtist = strings.ToLower(hit.Result.PrimaryArtist.Name)
		hitSong = strings.ToLower(hit.Result.Title)

		if strings.Contains(hitArtist, artist) && strings.Contains(hitSong, song) {
			return hit
		}

		if strings.Contains(artist, "&") {
			if MatchCollabArtists(hitArtist, artist) && strings.Contains(hitSong, song) {
				return hit
			}
		}
	}

	for _, hit := range hits {
		hitArtist = strings.ToLower(hit.Result.PrimaryArtist.Name)
		hitSong = strings.ToLower(hit.Result.Title)

		var reg = regexp.MustCompile(`\((.+?)\)|\[(.+?)\]|{(.+?)}`)
		hitArtistNoParentheses := strings.Trim(reg.ReplaceAllString(hitArtist, ``), " ")
		artistNoParentheses := strings.Trim(reg.ReplaceAllString(artist, ``), " ")
		hitSongNoParentheses := strings.Trim(reg.ReplaceAllString(hitSong, ``), " ")
		songNoParentheses := strings.Trim(reg.ReplaceAllString(song, ``), " ")

		if strings.Contains(hitArtistNoParentheses, artistNoParentheses) && strings.Contains(hitSongNoParentheses, songNoParentheses) {
			return hit
		}

		if strings.Contains(artist, "&") {
			if MatchCollabArtists(hitArtistNoParentheses, artistNoParentheses) && strings.Contains(hitSongNoParentheses, songNoParentheses) {
				return hit
			}
		}
	}

	for _, hit := range hits {
		hitArtist = strings.ToLower(hit.Result.PrimaryArtist.Name)
		hitSong = strings.ToLower(hit.Result.Title)

		var reg = regexp.MustCompile(`\((.+?)\)|\[(.+?)\]|{(.+?)}`)
		hitArtistNoParentheses := strings.Trim(reg.ReplaceAllString(hitArtist, ``), " ")
		artistNoParentheses := strings.Trim(reg.ReplaceAllString(artist, ``), " ")
		hitSongNoParentheses := strings.Trim(reg.ReplaceAllString(hitSong, ``), " ")
		songNoParentheses := strings.Trim(reg.ReplaceAllString(song, ``), " ")

		reg = regexp.MustCompile(`[^a-z0-9]+`)
		hitArtistAlphanumeric := strings.Trim(reg.ReplaceAllString(hitArtistNoParentheses, ``), "")
		artistAlphanumeric := strings.Trim(reg.ReplaceAllString(artistNoParentheses, ``), "")
		hitSongAlphanumeric := strings.Trim(reg.ReplaceAllString(hitSongNoParentheses, ``), "")
		songAlphanumeric := strings.Trim(reg.ReplaceAllString(songNoParentheses, ``), "")

		if strings.Contains(hitArtistAlphanumeric, artistAlphanumeric) && strings.Contains(hitSongAlphanumeric, songAlphanumeric) {
			return hit
		}

		if strings.Contains(artist, "&") {
			if MatchCollabArtists(hitArtistAlphanumeric, artistAlphanumeric) && strings.Contains(hitSongAlphanumeric, songAlphanumeric) {
				return hit
			}
		}
	}

	return nil
}

func MatchCollabArtists(hitArtist string, artists string) bool {
	collabArtists := strings.Split(artists, "&")
	foundMatch := false

	for _, collabArtist := range collabArtists {
		collabArtist = strings.Trim(collabArtist, " ")

		if strings.Contains(hitArtist, collabArtist) {
			foundMatch = true
			break
		}
	}

	return foundMatch
}

func main() {
	lambda.Start(Handler)
}
