#!/bin/bash

go get github.com/gorilla/websocket
go get github.com/gorilla/mux

dir=dist
mkdir -p ./$dir
mkdir -p ./$dir/public

go build -race -gcflags='-N -l' -o ./$dir/debug ./src/* 
