package main

import (
	"net/http"
	"net/url"

	"github.com/gorilla/websocket"
)

//WSProvider WebSocket
type WSProvider struct {
	wsUpgrader   websocket.Upgrader
	gameInstance *Game
	hubInstance  Hub
}

//NewWSProvider Create a new WSProvider
func NewWSProvider(g *Game) WSProvider {
	return WSProvider{
		gameInstance: g,
		hubInstance:  NewHub(g),
		wsUpgrader: websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	}
}

func (p *WSProvider) start() {

	go p.hubInstance.run()

	http.HandleFunc("/socket", func(w http.ResponseWriter, r *http.Request) {

		query, err := url.ParseQuery(r.URL.RawQuery)
		if err != nil {
			CatchError("handleConnection", err)
			return
		}

		id := query.Get("id")
		if isEmpty, err := IsStringEmpty(id); isEmpty == true || err != nil {
			CatchError("handleConnection", err)
			return
		}

		p.gameInstance.send <- PlayerExistsMessage(id)

		connection, err := p.wsUpgrader.Upgrade(w, r, nil)
		if err != nil {
			CatchError("handleConnection", err)
			return
		}

		mt, data, err := connection.ReadMessage()
		resData, err := PrepareResponseMessage(p.gameInstance, data)
		if err = connection.WriteMessage(mt, resData); err != nil {
			CatchError("NewPlayerRegistered ", err)
		}

		client := &Client{
			id:   id,
			hub:  &p.hubInstance,
			conn: connection,
			send: make(chan []byte, 1024),
		}

		p.hubInstance.register <- client

		go client.read()
	})
}
