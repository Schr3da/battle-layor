package main

import (
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

func (h *Hub) getClientByID(id string) *Client {
	var c *Client
	for c = range h.clients {
		if c.id == id {
			break
		}
	}
	return c
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
			onEntered(client)
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				onLeave(client)
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					onLeave(client)
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

	PrintLog("Client connected: " + c.getID())
}

func onLeave(c *Client) {
	if c == nil {
		CatchError("onLeave", NewError("Client is nil"))
		return
	}

	id := c.getID()
	PrintLog("Client disconnected: " + id)
	GameInstance.removePlayerWithID(id)
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
		return nil, NewError("Unknown resource request")
	}
}
