package main

//GRAction General Game Receiver Action type
type GRAction int

const (
	//GameDoesPlayerExist GRAction to check a player exists or not
	GameDoesPlayerExist = 0
	//GameAddNewPlayer GRAction to add a new Player
	GameAddNewPlayer GRAction = 1
	//GameRemovePlayer GRAction to remove a player from game
	GameRemovePlayer GRAction = 2
	//GameUpdatePlayer GRAction to update player position
	GameUpdatePlayer = 3
	//GetGameSnapshot GRAction to get current game state
	GetGameSnapshot = 4
)

//GameSnapshotReceiver Basic Model for GameSnapshotReceiver
type GameSnapshotReceiver struct {
	world   [MapTilesY][MapTilesX]string
	players map[string]Player
}

//GameSnapshotSender Basic Model for GameSnapshotSender
type GameSnapshotSender struct {
	receiver chan GameSnapshotReceiver
}

//GameHasPlayerSender Basic Model for GameHasPlayerSender
type GameHasPlayerSender struct {
	id       string
	receiver chan bool
}

//PlayerExistsMessage Create New PlayerExistsMessage For Send Channel
func PlayerExistsMessage(id string, receiver chan bool) GameHasPlayerSender {
	return GameHasPlayerSender{
		id:       id,
		receiver: receiver,
	}
}

//GameSender Basic Model for GameSender
type GameSender struct {
	action GRAction
	data   []byte
	id     string
}

//GameAddPlayerData Structure which is used to register a new Player in game
type GameAddPlayerData struct {
	Name     string
	PseudoID string
}

//AddPlayerMessage Creates AddPlayerMessage consumed by game send channel
func AddPlayerMessage(id string, pseudoID string, name string) GameSender {
	data, _ := DataToBytes(GameAddPlayerData{Name: name, PseudoID: pseudoID})

	return GameSender{
		action: GameAddNewPlayer,
		data:   data,
		id:     id,
	}
}

//RemovePlayerMessage Creates RemovePlayerMessage consumed by game send channel
func RemovePlayerMessage(id string) GameSender {
	return GameSender{
		action: GameRemovePlayer,
		data:   nil,
		id:     id,
	}
}

//UpdatePlayerMessage Creates UpdatePlayerMessage consumed by game send channel
func UpdatePlayerMessage(id string, data []byte) GameSender {
	return GameSender{
		action: GameUpdatePlayer,
		data:   data,
		id:     id,
	}
}
