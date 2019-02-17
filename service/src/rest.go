package main

import (
	"github.com/gorilla/mux"
	"net/http"
)

//InitRestHandler Supported REST route handing
func InitRestHandler() {
	prefix := "rest"
	router := mux.NewRouter()
	router.PathPrefix(prefix)
	router.HandleFunc("/"+prefix+"/player/register/", registerPlayerHandler).Methods("POST", "OPTIONS")
	http.Handle("/", router)
}

type _RegisterPlayerBody struct {
	Name string `json:"name"`
}

func registerPlayerHandler(w http.ResponseWriter, req *http.Request) {
	var body _RegisterPlayerBody

	if err := ReadBytesFromBody(req.Body, &body); err != nil {
		SendErrorResponse(w, err)
		return
	}

	SendResponse(w, nil)
}
