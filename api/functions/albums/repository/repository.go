package repository

import (
	"fmt"
	"os"
	"time"

	"github.com/andrewjshilliday/valence-api/functions/albums/model"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Item struct {
	Id          string       `json:"id"`
	Storefront  string       `json:"storefront"`
	Album       *model.Album `json:"album"`
	ArtistName  string       `json:"artistName"`
	AlbumName   string       `json:"albumName"`
	CreatedDate time.Time    `json:"createdDate"`
	UpdatedDate time.Time    `json:"updatedDate"`
}

func Get(id string, storefront string) (*model.Album, error) {
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
		return item.Album, err
	}

	err = dynamodbattribute.UnmarshalMap(result.Item, &item)
	if err != nil {
		return item.Album, err
	}

	return item.Album, nil
}

func Post(album *model.Album, storefront string) (*model.Album, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	item := Item{
		Id:          album.Id,
		Storefront:  storefront,
		Album:       album,
		ArtistName:  album.Resources.Data.Attributes.ArtistName,
		AlbumName:   album.Resources.Data.Attributes.Name,
		CreatedDate: time.Now(),
	}

	av, err := dynamodbattribute.MarshalMap(item)
	if err != nil {
		return item.Album, err
	}

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(os.Getenv("TABLE_NAME")),
	}
	_, err = svc.PutItem(input)
	return item.Album, err
}

func Put(album *model.Album, storefront string) (*model.Album, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	item := Item{
		Id:          album.Id,
		Storefront:  storefront,
		Album:       album,
		UpdatedDate: time.Now(),
	}

	av, err := dynamodbattribute.MarshalMap(item.Album)

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
			":d": {
				S: aws.String(item.UpdatedDate.String()),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set album = :a, updatedDate = :d"),
	}

	_, err = svc.UpdateItem(input)
	if err != nil {
		fmt.Println(err.Error())
	}
	return item.Album, err
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
