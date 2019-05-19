package main

import "net/http"

//PrepareResponseMessage General websocket data mapper for Responses
func PrepareResponseMessage(g *Game, data []byte) ([]byte, error) {
	var d WSRequest
	if err := ReadBytes(data, &d); err != nil {
		CatchError("handleMessage", err)
		return nil, err
	}

	switch d.Resource {
	case ResourceMap:
		data := NewWSResponse(http.StatusAccepted, ActionGame, ResourceMap, g.world)
		return data, nil
	case ResourcePlayer:
		data := NewWSResponse(http.StatusAccepted, ActionGame, ResourcePlayer, d)
		return data, nil
	default:
		return nil, NewError("Unknown resource request")
	}
}
