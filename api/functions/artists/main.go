package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
	"github.com/andrewjshilliday/valence-api/functions/artists/model"
	"github.com/andrewjshilliday/valence-api/functions/artists/repository"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// Handler function for AWS lambda routing
func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch request.HTTPMethod {
	case "GET":
		storefront := request.QueryStringParameters["storefront"]
		imageOnly, _ := strconv.ParseBool(request.QueryStringParameters["imageOnly"])
		paramIds := request.QueryStringParameters["ids"]
		var ids []string
		if paramIds != "" {
			ids = strings.Split(paramIds, ",")
		}

		return GetArtists(ids, storefront, imageOnly)
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

// GetArtists funciton retireves data for multiple artists
func GetArtists(ids []string, storefront string, imageOnly bool) (events.APIGatewayProxyResponse, error) {
	var wg sync.WaitGroup
	wg.Add(len(ids))

	response := model.Response{}

	for _, id := range ids {
		go GetArtist(&response, &wg, id, storefront, imageOnly)
	}

	wg.Wait()

	data, _ := json.Marshal(response)

	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                "application/json; charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
		},
		Body:       string(data),
		StatusCode: 200,
	}, nil
}

// GetArtist funciton retrieves data for an artist
func GetArtist(response *model.Response, wg *sync.WaitGroup, id string, storefront string, imageOnly bool) {
	artist, _ := repository.Get(id, storefront)
	var updateRequired bool

	if artist != nil {
		if imageOnly {
			artist.Resources = nil
		}

		if imageOnly || artist.Resources != nil {
			response.Artists = append(response.Artists, artist)
			defer wg.Done()
			return
		}

		updateRequired = true
	}

	artist = &model.Artist{Id: id}

	resp, err := http.Get("https://itunes.apple.com/" + storefront + "/artist/" + id)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	document, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		log.Fatal("Error loading HTTP response body. ", err)
	}

	document.Find("meta").Each(func(i int, s *goquery.Selection) {
		if name, _ := s.Attr("name"); name == "twitter:image" {
			imageURL, _ := s.Attr("content")
			artist.ImageUrl = string(imageURL[0:strings.LastIndex(imageURL, "/")]) + "/{w}x{h}bb.jpeg"
		}
	})

	if !imageOnly {
		document.Find("script").Each(func(i int, s *goquery.Selection) {
			if id, _ := s.Attr("id"); id == "shoebox-ember-data-store" {
				artistData := s.Text()
				json.Unmarshal([]byte(artistData), &artist.Resources)

				for i := len(artist.Resources.Included) - 1; i >= 0; i-- {
					if artist.Resources.Included[i].Type == "offer" {
						artist.Resources.Included = append(artist.Resources.Included[:(i)], artist.Resources.Included[(i+1):]...)
						continue
					}
					if artist.Resources.Included[i].Type == "image" {
						artist.Resources.Included = append(artist.Resources.Included[:(i)], artist.Resources.Included[(i+1):]...)
						continue
					}
					if artist.Resources.Included[i].Type == "genre" {
						artist.Resources.Included = append(artist.Resources.Included[:(i)], artist.Resources.Included[(i+1):]...)
						continue
					}
					if strings.HasPrefix(artist.Resources.Included[i].Type, "lockup") {
						if artist.Resources.Included[i].Type == "lockup/section" {
							if strings.HasSuffix(artist.Resources.Included[i].ID, "playlists") {
								artist.Resources.Included = append(artist.Resources.Included[:(i)], artist.Resources.Included[(i+1):]...)
								continue
							}
							if strings.HasSuffix(artist.Resources.Included[i].ID, "Videos") {
								artist.Resources.Included = append(artist.Resources.Included[:(i)], artist.Resources.Included[(i+1):]...)
								continue
							}
							if strings.HasSuffix(artist.Resources.Included[i].ID, "Movies") {
								artist.Resources.Included = append(artist.Resources.Included[:(i)], artist.Resources.Included[(i+1):]...)
								continue
							}
							if strings.HasSuffix(artist.Resources.Included[i].ID, "Books") {
								artist.Resources.Included = append(artist.Resources.Included[:(i)], artist.Resources.Included[(i+1):]...)
								continue
							}
						} else {
							artist.Resources.Included = append(artist.Resources.Included[:(i)], artist.Resources.Included[(i+1):]...)
							continue
						}
					}
				}
			}
		})
	}

	if updateRequired {
		repository.Put(artist, storefront)
	} else {
		repository.Post(artist, storefront)
	}

	response.Artists = append(response.Artists, artist)
	defer wg.Done()
}

func main() {
	lambda.Start(Handler)
}
