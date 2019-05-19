package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

//InitRestHandler Supported REST route handing
func InitRestHandler(g *Game) {
	prefix := "rest"
	router := mux.NewRouter()

	router.PathPrefix(prefix)

	router.HandleFunc("/"+prefix+"/player/register/", func(w http.ResponseWriter, r *http.Request) {
		registerPlayerHandler(w, r, g)
	}).Methods("POST", "OPTIONS")

	router.HandleFunc("/"+prefix+"/player/unregister/", func(w http.ResponseWriter, r *http.Request) {
		unregisterPlayerHandler(w, r, g)
	}).Methods("POST", "OPTIONS")

	http.Handle("/", router)
}

type _RegisterPlayerBody struct {
	Name string `json:"name"`
}

type _RegisterPlayerResponse struct {
	ID string `json:"id"`
}

func registerPlayerHandler(w http.ResponseWriter, req *http.Request, g *Game) {
	var body _RegisterPlayerBody

	if err := ReadBytesFromBody(req.Body, &body); err != nil {
		SendErrorResponse(w, err)
		return
	}

	name := body.Name
	if _, err := IsStringEmpty(name); err != nil {
		SendErrorResponse(w, err)
		return
	}

	id, err := GeneratePlayerID(name)
	if err != nil {
		CatchError("Unable to register new player", err)
		SendErrorResponse(w, err)
		return
	}

	g.send <- AddPlayerMessage(id, name)

	/*
		if err := g.addPlayerWithName(id, name); err != nil {
			SendErrorResponse(w, err)
			return
		}
	*/

	response := _RegisterPlayerResponse{
		ID: id,
	}

	SendResponse(w, response)
}

func unregisterPlayerHandler(w http.ResponseWriter, req *http.Request, g *Game) {
	var body _RegisterPlayerResponse

	if err := ReadBytesFromBody(req.Body, &body); err != nil {
		SendErrorResponse(w, err)
		return
	}

	var id = body.ID
	if _, err := IsStringEmpty(id); err != nil {
		SendErrorResponse(w, err)
		return
	}

	g.send <- RemovePlayerMessage(id)
	SendResponse(w, nil)
}
