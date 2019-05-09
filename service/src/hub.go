package main

import (
	"net/http"
	"sync"
)

//Hub General Client Manager
type Hub struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	mutex      *sync.Mutex
}

//HubInstance Hub Instance
var HubInstance = NewHub()

//NewHub Generate a new hub
func NewHub() *Hub {
	h := Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
		mutex:      &sync.Mutex{},
	}

	go h.run()
	return &h
}

func (h *Hub) getClientByID(id string) *Client {
	defer func() {
		h.mutex.Unlock()
	}()

	h.mutex.Lock()
	for c := range h.clients {
		if c.id == id {
			return c
		}
	}
	return nil
}

func (h *Hub) onRegister(c *Client) {
	defer func() {
		h.mutex.Unlock()
	}()

	h.clients[c] = true
	h.mutex.Lock()

	onEntered(c)
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

func (h *Hub) onUnregister(c *Client) {
	defer func() {
		h.mutex.Lock()
	}()

	h.mutex.Lock()

	_, ok := h.clients[c]

	if ok {
		PrintLog("onUnregister IF")

		h.clients[c] = false
		onLeave(c)
		delete(h.clients, c)
		close(c.send)
	}
}

func onLeave(c *Client) {
	if c == nil {
		CatchError("onLeave", NewError("Client is nil"))
		return
	}

	id := c.getID()
	GameInstance.removePlayerWithID(id)
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			PrintLog("received register")
			h.onRegister(client)
		case client := <-h.unregister:
			PrintLog("received unregister")
			h.onUnregister(client)
		case message := <-h.broadcast:
			for client := range h.clients {
				PrintLog("broadcast")
				select {
				case client.send <- message:
				default:
					h.onUnregister(client)
				}
			}
		}
	}
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
	case ResourcePlayer:
		data := NewWSResponse(http.StatusAccepted, ActionGame, ResourcePlayer, d)
		return data, nil
	default:
		return nil, NewError("Unknown resource request")
	}
}
