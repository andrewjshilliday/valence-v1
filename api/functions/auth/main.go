package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/andrewjshilliday/valence-api/functions/auth/model"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// Handler function for AWS lambda routing
func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch request.HTTPMethod {
	case "GET":
		service := request.QueryStringParameters["service"]

		switch service {
		case "apple-music":
			return GetAppleMusicAuthToken()
		case "spotify":
			return GetSpotifyAuthToken()
		default:
			return events.APIGatewayProxyResponse{
				Headers: map[string]string{
					"Content-Type":                "application/json; charset=UTF-8",
					"Access-Control-Allow-Origin": "*",
				},
				StatusCode: 501,
			}, nil
		}
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

// GetAppleMusicAuthToken funciton
func GetAppleMusicAuthToken() (events.APIGatewayProxyResponse, error) {
	// TODO
	authResp := model.AuthResponse{}
	authResp.AccessToken = os.Getenv("APPLE_MUSIC_TOKEN")

	data, _ := json.Marshal(authResp)

	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                "application/json; charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
		},
		Body:       string(data),
		StatusCode: 200,
	}, nil
}

// GetSpotifyAuthToken function
func GetSpotifyAuthToken() (events.APIGatewayProxyResponse, error) {
	req, err := http.NewRequest("POST", `https://accounts.spotify.com/api/token`, bytes.NewBuffer([]byte(`grant_type=client_credentials`)))
	req.Header.Set("Authorization", "Basic "+os.Getenv("SPOTIFY_TOKEN"))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Content-Type":                "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
			},
			StatusCode: 404,
		}, nil
	}

	authResp := model.AuthResponse{}
	err = json.Unmarshal(body, &authResp)
	if err != nil {
		panic(err)
	}

	data, _ := json.Marshal(authResp)

	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type":                "application/json; charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
		},
		Body:       string(data),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
