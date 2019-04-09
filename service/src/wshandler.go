package main

import (
	"github.com/gorilla/websocket"
	"net/http"
	"net/url"
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
	query, err := url.ParseQuery(r.URL.RawQuery)

	if err != nil {
		CatchError("handleConnection", err)
		return
	}

	clientID := query.Get("id")
	if isEmpty, err := IsStringEmpty(clientID); isEmpty == true || err != nil {
		CatchError("handleConnection", err)
		return
	}

	if GameInstance.doesPlayerExist(clientID) == false || hub.getClientByID(clientID) != nil {
		CatchError("handleConnection", NewError("Player already exists"))
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		CatchError("handleConnection", err)
		return
	}

	client := &Client{id: clientID, hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	go client.read()
	go client.write()
}
