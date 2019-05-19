package main

import (
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 2048
)

//Client Websocket client connection
type Client struct {
	sync.Mutex
	id   string
	hub  *Hub
	conn *websocket.Conn
	send chan []byte
}

func (c *Client) getID() string {
	c.Lock()
	defer c.Unlock()
	return c.id
}

func (c *Client) close() {
	c.Lock()
	defer c.Unlock()
	c.hub.unregister <- c
	c.conn.Close()
}

func (c *Client) read() {
	defer c.close()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				CatchError("error: ", err)
			}
			break
		}
		c.hub.broadcast <- message
	}
}
