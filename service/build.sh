#!/bin/bash

go get github.com/gorilla/websocket
go get github.com/gorilla/mux

dir=dist
mkdir -p ./$dir
mkdir -p ./$dir/public
mkdir -p ../client/$dir

cd ../client/
npm install 
npm run build-debug

cd ../service
cp -r ../client/$dir/debug ./$dir/public

go build -race -gcflags='-N -l' -o ./$dir/debug ./src/* 

