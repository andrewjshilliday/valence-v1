package repository

import (
	"fmt"
	"os"
	"time"

	"github.com/andrewjshilliday/valence-api/functions/artists/model"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Item struct {
	Id          string        `json:"id"`
	Storefront  string        `json:"storefront"`
	Artist      *model.Artist `json:"artist"`
	ArtistName  string        `json:"artistName"`
	CreatedDate time.Time     `json:"createdDate"`
	UpdatedDate time.Time     `json:"updatedDate"`
}

func Get(id string, storefront string) (*model.Artist, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)
	item := Item{}

	result, err := svc.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(id),
			},
			"storefront": {
				S: aws.String(storefront),
			},
		},
	})
	if err != nil {
		fmt.Println(err.Error())
		return item.Artist, err
	}

	err = dynamodbattribute.UnmarshalMap(result.Item, &item)
	if err != nil {
		return item.Artist, err
	}

	return item.Artist, nil
}

func Post(artist *model.Artist, storefront string) (*model.Artist, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	item := Item{
		Id:          artist.Id,
		Storefront:  storefront,
		Artist:      artist,
		CreatedDate: time.Now(),
	}

	if artist.Resources != nil {
		item.ArtistName = artist.Resources.Data.Attributes.Name
	}

	av, err := dynamodbattribute.MarshalMap(item)
	if err != nil {
		return item.Artist, err
	}

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(os.Getenv("TABLE_NAME")),
	}
	_, err = svc.PutItem(input)
	return item.Artist, err
}

func Put(artist *model.Artist, storefront string) (*model.Artist, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	item := Item{
		Id:          artist.Id,
		Storefront:  storefront,
		Artist:      artist,
		UpdatedDate: time.Now(),
	}

	if artist.Resources != nil {
		item.ArtistName = artist.Resources.Data.Attributes.Name
	}

	av, err := dynamodbattribute.MarshalMap(item.Artist)

	input := &dynamodb.UpdateItemInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(item.Id),
			},
			"storefront": {
				S: aws.String(item.Storefront),
			},
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":a": {
				M: av,
			},
			":n": {
				S: aws.String(item.ArtistName),
			},
			":d": {
				S: aws.String(item.UpdatedDate.String()),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set artist = :a, artistName = :n, updatedDate = :d"),
	}

	_, err = svc.UpdateItem(input)
	if err != nil {
		fmt.Println(err.Error())
	}
	return item.Artist, err
}

func Delete(id string, storefront string) error {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(id),
			},
			"storefront": {
				S: aws.String(storefront),
			},
		},
		TableName: aws.String(os.Getenv("TABLE_NAME")),
	}

	_, err := svc.DeleteItem(input)
	if err != nil {
		fmt.Println(err.Error())
		return err
	}
	return nil
}
