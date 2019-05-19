package main

import (
	"log"
	"net/http"
)

//Server General server
type Server struct {
	gameInstance Game
	wsInstance   WSProvider
}

func (s *Server) start() {
	InitConfig()
	InitStaticHandler()
	InitRestHandler(&s.gameInstance)

	s.wsInstance.start()
	log.Fatal(http.ListenAndServe(*Host+":"+*Port, nil))
}

func main() {
	g := NewGame()
	ws := NewWSProvider(&g)

	s := Server{
		gameInstance: g,
		wsInstance:   ws,
	}
	s.start()
}
