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
		CatchError("readBytesFromBody", err)
		return err
	}

	if err := json.Unmarshal(data, &dest); err != nil {
		CatchError("registerPlayerHandler", err)
		return err
	}

	return nil
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
