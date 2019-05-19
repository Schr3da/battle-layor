package main

import (
	"sync"
)

//Hub General Client Manager
type Hub struct {
	sync.Mutex
	gameInstance *Game
	clients      map[string]*Client
	broadcast    chan []byte
	register     chan *Client
	unregister   chan *Client
}

//NewHub Generate a new hub
func NewHub(g *Game) Hub {
	return Hub{
		gameInstance: g,
		broadcast:    make(chan []byte),
		register:     make(chan *Client),
		unregister:   make(chan *Client),
		clients:      make(map[string]*Client),
	}
}

func (h *Hub) run() {
	for {
		select {
		case c := <-h.register:
			h.clients[c.getID()] = c
		case c := <-h.unregister:
			id := c.getID()
			if _, ok := h.clients[id]; ok == false {
				return
			}
			h.gameInstance.removePlayerWithID(id)
			delete(h.clients, id)
			close(c.send)
		case message := <-h.broadcast:
			PrintLog(string(message))
			for _, client := range h.clients {
				select {
				case client.send <- message:
				default:
					PrintLog("Do nothing")
				}
			}
		}
	}
}
