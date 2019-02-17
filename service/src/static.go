package main

import "net/http"

//InitStaticHandler Default statuic content configuation
func InitStaticHandler() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))
}
