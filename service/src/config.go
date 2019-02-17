package main

import (
	"flag"
	"log"
)

//Host used host
var Host = flag.String("host", "localhost:", "Host or Url to use")

//Port used port
var Port = flag.String("port", "8080", "Port to use")

//InitConfig Initialising server configuation
func InitConfig() {
	flag.Parse()
	log.SetFlags(0)
}
