package main

import (
	"encoding/json"
	"errors"
	"io"
	"io/ioutil"
	"net/http"
)

//Response Basic Response type
type Response struct {
	Status int         `json:"status"`
	Data   interface{} `json:"data"`
}

//WSRequest Client request structure data are optional
type WSRequest struct {
	Action   WSAction    `json:"action"`
	Resource WSResource  `json:"resource"`
	Data     interface{} `json:"data"`
}

//WSResponse Server to client message request structure data are optional
type WSResponse struct {
	Status   int         `json:"status"`
	Action   WSAction    `json:"action"`
	Resource WSResource  `json:"resource"`
	Data     interface{} `json:"data"`
}

//WSAction General Websocket Action type
type WSAction int

const (
	//ActionUI Action based on UI
	ActionUI WSAction = 0
	//ActionGame Action based on Game
	ActionGame WSAction = 1
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
)

//NewErrorResponse Default error response
func NewErrorResponse() []byte {
	d := Response{
		Status: http.StatusInternalServerError,
		Data:   nil,
	}
	data, _ := json.Marshal(&d)
	return data
}

//NewResponse Create a new response json Object
func NewResponse(status int, data interface{}) []byte {
	d, err := json.Marshal(Response{
		Status: status,
		Data:   data,
	})

	if err != nil {
		CatchError("New Response", err)
		return NewErrorResponse()
	}

	return d
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

//SendErrorResponse Default error response construction
func SendErrorResponse(w http.ResponseWriter, err error) {
	CatchError("SendErrorResponse", err)
	w.WriteHeader(http.StatusInternalServerError)
	w.Write(NewErrorResponse())
}

//SendResponse Default response construction
func SendResponse(w http.ResponseWriter, data interface{}) {
	w.WriteHeader(http.StatusAccepted)
	w.Write(NewResponse(http.StatusAccepted, data))
}

//ReadBytesFromBody Get Data from body
func ReadBytesFromBody(body io.Reader, dest interface{}) error {
	data, err := ioutil.ReadAll(body)
	if err != nil {
		CatchError("ReadBytesFromBody", err)
		return err
	}

	if err := json.Unmarshal(data, &dest); err != nil {
		CatchError("ReadBytesFromBody", err)
		return err
	}

	return nil
}

//ReadBytes Maps []byte to a provided struct
func ReadBytes(data []byte, dest interface{}) error {
	if err := json.Unmarshal(data, &dest); err != nil {
		CatchError("ReadBytes", err)
		return err
	}
	return nil
}

//DataToBytes Create
func DataToBytes(data interface{}) ([]byte, error) {

	return json.Marshal(data)
}

//IsStringEmpty Check for emptyness
func IsStringEmpty(s string) (bool, error) {
	if s == "" || len(s) == 0 {
		err := errors.New("Provided string is empty")
		CatchError("generateID", err)
		return true, err
	}
	return false, nil
}
