package main

import "fmt"

//Hub General Client Manager
type Hub struct {
	gameInstance *Game
	clients      map[string]*Client
	broadcast    chan WSBroadcast
	register     chan *Client
	unregister   chan *Client
}

//NewHub Generate a new hub
func NewHub(g *Game) Hub {
	return Hub{
		gameInstance: g,
		broadcast:    make(chan WSBroadcast),
		register:     make(chan *Client),
		unregister:   make(chan *Client),
		clients:      make(map[string]*Client),
	}
}

func (h *Hub) add(c *Client) {
	id := c.getID()
	h.clients[id] = c
}

func (h *Hub) remove(c *Client) {
	id := c.getID()
	if _, ok := h.clients[id]; ok {
		h.gameInstance.send <- RemovePlayerMessage(id)
		close(c.send)
		delete(h.clients, id)
	}
}

func (h *Hub) update(data WSBroadcast) {
	fmt.Println(string(data.id))
}

func (h *Hub) run() {
	for {
		select {
		case c := <-h.register:
			h.add(c)
		case c := <-h.unregister:
			h.remove(c)
		case d := <-h.broadcast:
			h.update(d)
			for _, client := range h.clients {
				select {
				case client.send <- d:
					h.update(d)
				default:
				}
			}
		}
	}
}
