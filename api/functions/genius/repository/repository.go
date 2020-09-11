package repository

import (
	"fmt"
	"os"
	"time"

	"github.com/andrewjshilliday/valence-api/functions/genius/model"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type Item struct {
	Id           string          `json:"id"`
	Artist       string          `json:"artist"`
	Song         string          `json:"song"`
	Resp         *model.Response `json:"resp"`
	GeniusSongId int             `json:"geniusSongId"`
	CreatedDate  time.Time       `json:"createdDate"`
	UpdatedDate  time.Time       `json:"updatedDate"`
}

func Get(id string) (*model.Response, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)
	item := Item{}

	result, err := svc.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(id),
			},
		},
	})
	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	}

	err = dynamodbattribute.UnmarshalMap(result.Item, &item)
	if err != nil {
		return nil, err
	}

	return item.Resp, nil
}

func Post(id string, artist string, song string, resp *model.Response) (*model.Response, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	item := Item{
		Id:           id,
		Artist:       artist,
		Song:         song,
		Resp:         resp,
		GeniusSongId: resp.Response.Song.ID,
		CreatedDate:  time.Now(),
	}

	av, err := dynamodbattribute.MarshalMap(item)
	if err != nil {
		return nil, err
	}

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String(os.Getenv("TABLE_NAME")),
	}
	_, err = svc.PutItem(input)
	return item.Resp, err
}

func Put(id string, resp *model.Response) (*model.Response, error) {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	item := Item{
		Id:           id,
		Resp:         resp,
		GeniusSongId: resp.Response.Song.ID,
		UpdatedDate:  time.Now(),
	}

	av, err := dynamodbattribute.MarshalMap(item.Resp)

	input := &dynamodb.UpdateItemInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(item.Id),
			},
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":r": {
				M: av,
			},
			":d": {
				S: aws.String(item.UpdatedDate.String()),
			},
		},
		ReturnValues:     aws.String("UPDATED_NEW"),
		UpdateExpression: aws.String("set resp = :r, updatedDate = :d"),
	}

	_, err = svc.UpdateItem(input)
	if err != nil {
		fmt.Println(err.Error())
	}
	return item.Resp, err
}

func Delete(id string) error {
	sess := session.Must(session.NewSession())
	svc := dynamodb.New(sess)

	input := &dynamodb.DeleteItemInput{
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(id),
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
