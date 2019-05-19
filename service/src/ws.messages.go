package main

import (
	"encoding/json"
	"net/http"
)

//WSAction General Websocket Action type
type WSAction int

const (
	//ActionUI Action based on UI
	ActionUI WSAction = 0
	//ActionGame Action based on Game
	ActionGame WSAction = 1
	//ActionConnection Check websocket connection
	ActionConnection WSAction = 2
)

//WSResource General Websocket Resource type
type WSResource int

const (
	//ResourceMap Request map state
	ResourceMap WSResource = 0
	//ResourcePlayer Request player state
	ResourcePlayer WSResource = 1
	//ResourceStats Request stats state
	ResourceStats WSResource = 2
	//ResourceConnection Client connection health check state
	ResourceConnection WSResource = 3
)

//WSResponse Server to client message request structure data are optional
type WSResponse struct {
	Status   int         `json:"status"`
	Action   WSAction    `json:"action"`
	Resource WSResource  `json:"resource"`
	Data     interface{} `json:"data"`
}

//WSRequest Client request structure data are optional
type WSRequest struct {
	Action   WSAction    `json:"action"`
	Resource WSResource  `json:"resource"`
	Data     interface{} `json:"data"`
}

//WSBroadcast Broadcast structure
type WSBroadcast struct {
	data []byte
	id   string
}

//NewWSResponse Create a new websocket json response object
func NewWSResponse(status int, action WSAction, resource WSResource, data interface{}) []byte {
	d, err := json.Marshal(WSResponse{
		Action:   action,
		Resource: resource,
		Status:   status,
		Data:     data,
	})

	if err != nil {
		CatchError("New Response", err)
		return NewErrorResponse()
	}

	return d
}

//CreateWSResponse General websocket data mapper for Responses
func CreateWSResponse(g *Game, data []byte) ([]byte, error) {
	var d WSRequest
	if err := ReadBytes(data, &d); err != nil {
		CatchError("handleMessage", err)
		return nil, err
	}

	if g != nil {
		switch d.Resource {
		case ResourceMap:
			data := NewWSResponse(http.StatusAccepted, ActionGame, ResourceMap, g.world)
			return data, nil
		default:
			return nil, NewError("Unknown resource request")
		}
	} else {

		switch d.Resource {
		case ResourcePlayer:
			data := NewWSResponse(http.StatusAccepted, ActionGame, ResourcePlayer, d.Data)
			return data, nil
		default:
			return nil, NewError("Unknown resource request")
		}
	}
}
