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

//Player Player
type Player struct {
	id        string
	health    int
	direction float32
	mode      PlayerMode
	position  Vector2d
}

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

//NewPlayer Create a new Player based on provided name and position
func NewPlayer(id string, name string, position Vector2d) Player {
	p := Player{
		id:        id,
		health:    100,
		direction: 0.0,
		mode:      SPECTATOR,
		position:  position,
	}
	return p
}

func (p *Player) getID() string {
	return p.id
}

func (p *Player) setHealth(value int) {
	p.health = value
}

func (p *Player) setDirection(value float32) {
	p.direction = value
}

func (p *Player) setPosition(x float64, y float64) {
	p.position.x = x
	p.position.y = y
}

func (p *Player) setMode(m PlayerMode) {
	p.mode = m
}
