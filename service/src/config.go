package main

import (
	"flag"
	"log"
)

//Host used host
var Host = flag.String("host", "0.0.0.0", "Host or Url to use")

//Port used port
var Port = flag.String("port", "8080", "Port to use")

//LogsEnabled show log message
var LogsEnabled = flag.Bool("logs", true, "Enable/Disable logs")

//StaticContent path to the static content
var StaticContent = flag.String("content", "./public", "Static content path (default ./public)")

//InitConfig Initialising server configuation
func InitConfig() {
	flag.Parse()
	log.SetFlags(0)
}
