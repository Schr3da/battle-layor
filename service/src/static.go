package main

import "net/http"

//InitStaticHandler Default statuic content configuation
func InitStaticHandler() {
	fs := http.FileServer(http.Dir(*StaticContent))
	http.Handle("/public/", http.StripPrefix("/public/", fs))
}
