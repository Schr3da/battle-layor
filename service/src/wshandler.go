package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

// WSEntity Basic Game object which will be calculated server side
type WSEntity struct {
	position Vector2d
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

//InitWSHandler setup of handler and route
func InitWSHandler() {
	http.HandleFunc("/socket", entityHandler)
}

func entityHandler(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		CatchError("udpate", err)
		return
	}

	for {
		mt, data, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}

		if err = c.WriteMessage(mt, data); err != nil {
			CatchError("write", err)
		}
	}
}
