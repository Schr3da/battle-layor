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
	ID       string `json:"id"`
	PseudoID string `json:"pseudoID"`
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

	id, err := CreatePlayerID(name)
	if err != nil {
		CatchError("Unable to register new player", err)
		SendErrorResponse(w, err)
		return
	}

	var isExisting = make(chan bool)
	g.hasPlayer <- PlayerExistsMessage(id, isExisting)

	if r := <-isExisting; r == true {
		SendErrorResponse(w, NewError("Player already exists"))
		return
	}

	pseudoID, err := CreatePseudoPlayerID(id)
	if err != nil {
		SendErrorResponse(w, NewError("Player already exists"))
		return
	}

	g.send <- AddPlayerMessage(id, pseudoID, name)
	SendResponse(w, _RegisterPlayerResponse{
		ID:       id,
		PseudoID: pseudoID,
	})
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
