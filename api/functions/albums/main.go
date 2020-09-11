package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
	"github.com/andrewjshilliday/valence-api/functions/albums/model"
	"github.com/andrewjshilliday/valence-api/functions/albums/repository"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// Handler function for AWS lambda routing
func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch request.HTTPMethod {
	case "GET":
		storefront := request.QueryStringParameters["storefront"]
		paramIds := request.QueryStringParameters["ids"]
		var ids []string
		if paramIds != "" {
			ids = strings.Split(paramIds, ",")
		}

		return GetAlbums(ids, storefront)
	default:
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Content-Type":                "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
			},
			StatusCode: 403,
		}, nil
	}
}

// GetAlbums funciton retireves data for multiple albums
func GetAlbums(ids []string, storefront string) (events.APIGatewayProxyResponse, error) {
	var wg sync.WaitGroup
	wg.Add(len(ids))

	response := model.Response{}

	for _, id := range ids {
		go GetAlbum(&response, &wg, id, storefront)
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

// GetAlbum funciton retrieves data for an album
func GetAlbum(response *model.Response, wg *sync.WaitGroup, id string, storefront string) {
	album, _ := repository.Get(id, storefront)

	if album != nil {
		response.Albums = append(response.Albums, album)
		defer wg.Done()
		return
	}

	album = &model.Album{Id: id}

	resp, err := http.Get("https://itunes.apple.com/" + storefront + "/album/" + id)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	document, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		log.Fatal("Error loading HTTP response body. ", err)
	}

	document.Find("script").Each(func(i int, s *goquery.Selection) {
		if id, _ := s.Attr("id"); id == "shoebox-ember-data-store" {
			albumData := s.Text()
			json.Unmarshal([]byte(albumData), &album.Resources)

			for i := len(album.Resources.Included) - 1; i >= 0; i-- {
				if album.Resources.Included[i].Type == "offer" {
					album.Resources.Included = append(album.Resources.Included[:(i)], album.Resources.Included[(i+1):]...)
					continue
				}
				if album.Resources.Included[i].Type == "image" {
					album.Resources.Included = append(album.Resources.Included[:(i)], album.Resources.Included[(i+1):]...)
					continue
				}
				if album.Resources.Included[i].Type == "genre" {
					album.Resources.Included = append(album.Resources.Included[:(i)], album.Resources.Included[(i+1):]...)
					continue
				}
				if album.Resources.Included[i].Type == "review" {
					album.Resources.Included = append(album.Resources.Included[:(i)], album.Resources.Included[(i+1):]...)
					continue
				}
				if strings.HasPrefix(album.Resources.Included[i].Type, "lockup") {
					album.Resources.Included = append(album.Resources.Included[:(i)], album.Resources.Included[(i+1):]...)
					continue
				}
			}
		}
	})

	repository.Post(album, storefront)

	response.Albums = append(response.Albums, album)
	defer wg.Done()
}

func main() {
	lambda.Start(Handler)
}
