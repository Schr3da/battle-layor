package main

//GRAction General Game Receiver Action type
type GRAction int

const (
	//GameDoesPlayerExist GGRAction to check a player exists or not
	GameDoesPlayerExist = 0
	//GameAddNewPlayer GRAction to add a new Player
	GameAddNewPlayer GRAction = 1
	//GameRemovePlayer GRAction to remove a player from game
	GameRemovePlayer GRAction = 2
	//GameUpdatePlayerPosition GRAction to update player position
	GameUpdatePlayerPosition = 3
)

//GameSender Basic Model for GameSender
type GameSender struct {
	action GRAction
	data   *string
	id     string
}

//AddPlayerMessage Create New AddPlayerMessage
func AddPlayerMessage(id string, name string) GameSender {
	return GameSender{
		action: GameAddNewPlayer,
		data:   &name,
		id:     id,
	}
}

//RemovePlayerMessage Create New RemovePlayerMessage For Send Channel
func RemovePlayerMessage(id string) GameSender {
	return GameSender{
		action: GameRemovePlayer,
		data:   nil,
		id:     id,
	}
}

//PlayerExistsMessage Create New PlayerExistsMessage For Send Channel
func PlayerExistsMessage(id string) GameSender {
	return GameSender{
		action: GameDoesPlayerExist,
		data:   nil,
		id:     id,
	}
}
