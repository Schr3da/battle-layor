package main

//Game Game
type Game struct {
	getGameSnapshot chan GameSnapshotSender
	hasPlayer       chan GameHasPlayerSender
	send            chan GameSender
	world           [MapTilesY][MapTilesX]string
	players         map[string]Player
}

//NewGame Create a new Game instance
func NewGame() Game {
	g := Game{
		getGameSnapshot: make(chan GameSnapshotSender),
		hasPlayer:       make(chan GameHasPlayerSender),
		send:            make(chan GameSender),
		world:           GenerateMap(),
		players:         map[string]Player{},
	}

	go g.run()
	return g
}

func (g *Game) doesPlayerExist(id string) bool {
	_, ok := g.players[id]
	return ok
}

func (g *Game) addPlayer(id string, d []byte) error {

	var data GameAddPlayerData
	ReadBytes(d, &data)

	if g.doesPlayerExist(id) {
		err := NewError("Player already exists")
		CatchError("addPlayerWithName: ", err)
		return err
	}

	player := NewPlayer(id, data.PseudoID, data.Name, getRandomSpawnPlace(g.world))
	g.players[id] = player
	return nil
}

func (g *Game) removePlayer(id string) {
	if g.doesPlayerExist(id) == false {
		return
	}
	delete(g.players, id)
}

func (g *Game) updatePlayer(id string, data []byte) {

	var newState WSPlayerData
	if err := ReadBytes(data, &newState); err != nil {
		CatchError("updatePlayer", err)
		return
	}

	if g.doesPlayerExist(id) == false {
		return
	}

	player := g.players[id]
	player.update(newState)
}

func (g *Game) run() {
	defer func() {
		close(g.send)
	}()

	for {
		select {
		case r := <-g.getGameSnapshot:
			r.receiver <- GameSnapshotReceiver{
				players: g.players,
				world:   g.world,
			}
		case r := <-g.hasPlayer:
			r.receiver <- g.doesPlayerExist(r.id)
		case r := <-g.send:
			switch r.action {
			case GameAddNewPlayer:
				g.addPlayer(r.id, r.data)
			case GameRemovePlayer:
				g.removePlayer(r.id)
			case GameUpdatePlayer:
				g.updatePlayer(r.id, r.data)
			}
		}
	}
}
