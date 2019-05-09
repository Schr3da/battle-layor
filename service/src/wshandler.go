package main

import (
	"github.com/gorilla/websocket"
	"net/http"
	"net/url"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

//InitWSHandler setup of handler and route
func InitWSHandler() {
	http.HandleFunc("/socket", handleConnection)
}

func handleConnection(w http.ResponseWriter, r *http.Request) {
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

	if GameInstance.doesPlayerExist(clientID) == false || HubInstance.getClientByID(clientID) != nil {
		CatchError("handleConnection", NewError("Player already exists"))
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		CatchError("handleConnection", err)
		return
	}

	client := &Client{id: clientID, hub: HubInstance, conn: conn, send: make(chan []byte, 1024)}
	HubInstance.register <- client

	go client.read()
	go client.write()

}
