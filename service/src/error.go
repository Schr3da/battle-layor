package main

import "log"

//CatchError Prints the error
func CatchError(action string, e error) {
	log.Print(action, e.Error())
}
