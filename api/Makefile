build:
	dep ensure
	env GOOS=linux go build -ldflags="-s -w" -o bin/artists functions/artists/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/albums functions/albums/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/genius functions/genius/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/auth functions/auth/main.go
	GOARCH=amd64 GOOS=linux go build -o dlv/dlv github.com/derekparker/delve/cmd/dlv

run:
	sam local start-api

run-db:
	docker run -p 8000:8000 amazon/dynamodb-local

deploy-prod:
	sls deploy -s prod

deploy-dev:
	sls deploy -s dev
