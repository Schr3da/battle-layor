package main

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

func (h *Hub) update(d WSBroadcast) {
	var req WSRequest

	if err := ReadBytes(d.data, &req); err != nil {
		CatchError("Update Game for Broadcast not possible", err)
		return
	}

	if data, err := DataToBytes(req.Data); err == nil {
		h.gameInstance.send <- UpdatePlayerMessage(d.id, data)
	}
}

func (h *Hub) validToBroadcast(d WSBroadcast) bool {
	for id, client := range h.clients {
		if client.getID() == id && client.getpseudoID() == d.pseudoID {
			return true
		}
	}
	return false
}

func (h *Hub) broadcastData(d WSBroadcast) {

	if h.validToBroadcast(d) == false {
		return
	}

	for id, client := range h.clients {
		if d.id == id {
			continue
		}

		select {
		case client.send <- d:
			PrintLog("udpated player " + id)
		}
	}
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
			h.broadcastData(d)
		}
	}
}
