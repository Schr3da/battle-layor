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

//GeneratePlayerID Generate a randomized id based on the user name
func GeneratePlayerID(s string) (string, error) {
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

//Player Player
type Player struct {
	WSPlayerData
	id     string
	health int
	mode   PlayerMode
}

//NewPlayer Create a new Player based on provided name and position
func NewPlayer(id string, name string, position Vector2d) Player {
	p := Player{
		WSPlayerData: WSPlayerData{
			direction: Zero(),
			position:  position,
			plane:     Zero(),
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

func (p *Player) setDirection(v Vector2d) {
	p.direction = v
}

func (p *Player) setPosition(v Vector2d) {
	p.position = v
}

func (p *Player) setPlane(v Vector2d) {
	p.plane = v
}

func (p *Player) setMode(m PlayerMode) {
	p.mode = m
}

func (p *Player) update(d WSPlayerData) {
	p.setDirection(d.direction)
	p.setPosition(d.position)
	p.setPlane(d.plane)
}
