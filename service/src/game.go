package main

import "fmt"

//Game Game
type Game struct {
	send    chan GameSender
	world   [MapTilesY][MapTilesX]string
	players map[string]Player
}

//NewGame Create a new Game instance
func NewGame() Game {
	g := Game{
		send:    make(chan GameSender),
		world:   GenerateMap(),
		players: map[string]Player{},
	}

	go g.run()

	return g
}

func (g *Game) doesPlayerExist(id string) bool {
	_, ok := g.players[id]
	return ok
}

func (g *Game) addPlayerWithName(id string, name string) error {
	if g.doesPlayerExist(id) {
		err := NewError("Player already exists")
		CatchError("addPlayerWithName: ", err)
		return err
	}

	player := NewPlayer(id, name, getRandomSpawnPlace(g.world))
	g.players[id] = player
	return nil
}

func (g *Game) removePlayerWithID(id string) {
	if g.doesPlayerExist(id) == false {
		return
	}
	delete(g.players, id)
}

func (g *Game) run() {
	defer func() {
		close(g.send)
	}()

	for {
		select {
		case r := <-g.send:

			if r.action == GameDoesPlayerExist {
				result := g.doesPlayerExist(r.id)
				fmt.Println(result)
			} else if r.action == GameAddNewPlayer {
				g.addPlayerWithName(r.id, *r.data)
			} else if r.action == GameRemovePlayer {
				g.removePlayerWithID(r.id)
			}
		}
	}
}
