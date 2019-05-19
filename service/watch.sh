#!/bin/bash

go get github.com/gorilla/websocket
go get github.com/gorilla/mux

dir=dist
mkdir -p ./$dir
mkdir -p ./$dir/public

gow run -race -gcflags='-N -l' ./src/* -content="./dist/public/debug" 
