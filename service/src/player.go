package main

import (
	"crypto"
	"encoding/hex"
	"time"
)

//PlayerMode Supporte modes for an Player
type PlayerMode int

const (
	//SPECTATOR Inactive player mode
	SPECTATOR PlayerMode = 0
	//ACTOR Active player mode
	ACTOR PlayerMode = 1
)

//CreatePlayerID Generate a randomized id based on the user name
func CreatePlayerID(s string) (string, error) {
	if len(s) == 0 {
		err := NewError("Provided string is empty")
		CatchError("generateID", err)
		return "", err
	}

	hash := crypto.SHA256.New()

	if _, err := hash.Write([]byte(s)); err != nil {
		CatchError("generateID", err)
		return "", err
	}

	value := []byte(s + time.Millisecond.String())
	return hex.EncodeToString(hash.Sum(value)), nil
}

//CreatePseudoPlayerID Creates a new pseudoID from a generated layer id
func CreatePseudoPlayerID(s string) (string, error) {
	length := len(s)

	if length == 0 {
		err := NewError("Provided string is empty")
		CatchError("CreatePseudoPlayerID", err)
		return "", err
	}

	id := s[:length-length/2]
	return id, nil
}

//Player Player
type Player struct {
	WSPlayerData
	id     string
	health int
	mode   PlayerMode
}

//NewPlayer Create a new Player based on provided name and position
func NewPlayer(id string, pseudoID, name string, position Vector2d) Player {
	p := Player{
		WSPlayerData: WSPlayerData{
			PseudoID:  pseudoID,
			Direction: Zero(),
			Position:  position,
			Plane:     Zero(),
		},
		mode:   SPECTATOR,
		id:     id,
		health: 100,
	}
	return p
}

func (p *Player) getID() string {
	return p.id
}

func (p *Player) setHealth(value int) {
	p.health = value
}

func (p *Player) setMode(m PlayerMode) {
	p.mode = m
}

func (p *Player) update(d WSPlayerData) {
	p.Direction = d.Direction
	p.Position = d.Position
	p.Plane = d.Plane
}
