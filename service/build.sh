#!/bin/bash

go get github.com/gorilla/websocket
go get github.com/gorilla/mux

dir=dist
mkdir -p ./$dir
mkdir -p ./$dir/public
mkdir -p ../client/$dir
cp -r ../client/$dir/debug ./$dir/public

go build -gcflags='-N -l' -o ./$dir/debug ./src/* 

