package main

import (
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
	id       string
	pseudoId string
	hub      *Hub
	conn     *websocket.Conn
	send     chan WSBroadcast
}

func (c *Client) getPseudoID() string {
	return c.pseudoId
}

func (c *Client) getID() string {
	return c.id
}

func (c *Client) close() {
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

		c.hub.broadcast <- WSBroadcast{
			id:   c.getID(),
			data: message,
		}
	}
}

func (c *Client) write() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()

	for {
		select {
		case data, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}

			resData, err := CreateWSResponse(nil, data.data)
			if err != nil {
				return
			}

			w.Write(resData)
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
