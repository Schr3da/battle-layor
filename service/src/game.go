package main

//Game Game
type Game struct {
	w       World
	players map[string]*Player
}

//NewGame Create a new Game instance
func NewGame() Game {
	g := Game{
		w:       NewWorld(),
		players: map[string]*Player{},
	}
	return g
}

func (g *Game) getMap() [MapTilesY][MapTilesX]string {
	return g.w.tiles
}

func (g *Game) doesPlayerExist(id string) bool {
	return g.players[id] != nil
}

func (g *Game) addPlayerWithName(name string) (*string, error) {
	player, err := NewPlayer(name, g.w.pickRandomSpawnPlace())
	if err != nil {
		return nil, err
	}

	id := player.getID()

	if g.doesPlayerExist(id) {
		err := NewError("Player with same ID detected: name:" + name + "id: " + id)
		CatchError("addPlayerWithName", err)
		return nil, err
	}

	g.players[id] = player
	return &id, nil
}

func (g *Game) removePlayerWithID(id string) {
	if g.doesPlayerExist(id) == false {
		return
	}
	delete(g.players, id)
}
