package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func enableCors(w http.ResponseWriter) {
	headers := w.Header()
	headers.Add("Access-Control-Allow-Origin", "*")
	headers.Add("Vary", "Origin")
	headers.Add("Vary", "Access-Control-Request-Method")
	headers.Add("Vary", "Access-Control-Request-Headers")
	headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
	headers.Add("Access-Control-Allow-Methods", "GET, POST,OPTIONS")
}

//InitRestHandler Supported REST route handing
func InitRestHandler(g *Game) {
	prefix := "rest"
	router := mux.NewRouter()

	router.PathPrefix(prefix)

	router.HandleFunc("/"+prefix+"/health", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		w.WriteHeader(http.StatusOK)
	}).Methods("GET")

	router.HandleFunc("/"+prefix+"/player/register/", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		registerPlayerHandler(w, r, g)
	}).Methods("POST")

	router.HandleFunc("/"+prefix+"/player/unregister/", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		unregisterPlayerHandler(w, r, g)
	}).Methods("POST")

	router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		w.WriteHeader(http.StatusOK)
		return
	})

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
