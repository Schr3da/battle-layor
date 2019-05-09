package main

import (
	"log"
	"net/http"
)

//GameInstance Holding Game State
var GameInstance Game = NewGame()

func main() {
	InitConfig()
	InitWSHandler()
	InitRestHandler()
	InitStaticHandler()
	log.Fatal(http.ListenAndServe(*Host+":"+*Port, nil))
}
