package main

import (
	"errors"
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
			CatchError("read:", err)
			break
		}

		resData, err := handleMessage(data)
		if err = c.WriteMessage(mt, resData); err != nil {
			CatchError("write", err)
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
	case MAP:
		log.Print("MAP DATA REQUEST")
		//TODO return map
		return data, nil
	default:
		return nil, errors.New("Unknown resource request")
	}
}
