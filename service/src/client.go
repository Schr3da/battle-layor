package main

import (
	"github.com/gorilla/websocket"
)

//Client Websocket client connection
type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan []byte
}
