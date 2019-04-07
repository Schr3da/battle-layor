package main

import (
	"errors"
	"net/http"
)

//Hub General Client Manager
type Hub struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
}

//NewHub Generate a new hub
func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
			onEntered(client)
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
				onLeave(client)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}

func onEntered(c *Client) {
	mt, data, err := c.conn.ReadMessage()
	if err != nil {
		CatchError("read:", err)
		return
	}

	resData, err := handleMessage(data)
	if err = c.conn.WriteMessage(mt, resData); err != nil {
		CatchError("write", err)
	}
}

func onLeave(c *Client) {
	_, _, err := c.conn.ReadMessage()
	if err != nil {
		CatchError("read:", err)
		return
	}

	GameInstance.removePlayerWithID("Not done")
}

func handleMessage(data []byte) ([]byte, error) {
	var d WSRequest
	if err := ReadBytes(data, &d); err != nil {
		CatchError("handleMessage", err)
		return nil, err
	}

	switch d.Resource {
	case ResourceMap:
		data := NewWSResponse(http.StatusAccepted, ActionGame, ResourceMap, GameInstance.w.tiles)
		return data, nil
	default:
		return nil, errors.New("Unknown resource request")
	}
}
