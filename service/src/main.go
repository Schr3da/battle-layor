package main

import (
	"log"
	"net/http"
)

func main() {
	InitConfig()
	InitWSHandler()
	InitRestHandler()
	InitStaticHandler()
	log.Fatal(http.ListenAndServe(*Host+*Port, nil))
}
