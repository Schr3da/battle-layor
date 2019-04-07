package main

import (
	"github.com/gorilla/websocket"
	"net/http"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

//InitWSHandler setup of handler and route
func InitWSHandler() {

	var hub = NewHub()
	go hub.run()

	http.HandleFunc("/socket", func(w http.ResponseWriter, r *http.Request) {
		handleConnection(w, r, hub)
	})
}

func handleConnection(w http.ResponseWriter, r *http.Request, hub *Hub) {
	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		CatchError("handleConnection", err)
		return
	}

	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client
}
