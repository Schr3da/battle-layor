package main

import "sync"

//DoesKeyExist Checks either a key is included or not within the map
func DoesKeyExist(container map[string]Player, key string) bool {
	_, ok := container[key]
	return ok
}

//Game Game
type Game struct {
	sync.Mutex
	world   [MapTilesY][MapTilesX]string
	players map[string]Player
}

//NewGame Create a new Game instance
func NewGame() Game {
	g := Game{
		world:   GenerateMap(),
		players: map[string]Player{},
	}
	return g
}

func (g *Game) addPlayerWithName(id string, name string) error {
	g.Lock()
	defer g.Unlock()

	if DoesKeyExist(g.players, id) {
		err := NewError("Player already exists")
		CatchError("addPlayerWithName: ", err)
		return err
	}

	player := NewPlayer(id, name, getRandomSpawnPlace(g.world))
	g.players[id] = player
	return nil
}

func (g *Game) removePlayerWithID(id string) {
	g.Lock()
	defer g.Unlock()

	if DoesKeyExist(g.players, id) == false {
		return
	}
	delete(g.players, id)
}
