import {
  WebSocketProvider,
  IWSRequest,
  WSResource,
  WSAction
} from "../providers/WebSocketProvider";
import {
  WebSocketActions,
  OPEN_WS_CONNECTION_ACTION,
  SEND_WS_DATA_ACTION,
  CLOSE_WS_CONNECTION_ACTION,
  OPENED_WS_CONNECTION_ACTION
} from "../actions/WebSocketActions";

export interface IWebSocketState {
  ws: WebSocketProvider | null;
}

const initialState = {
  ws: null
};

const openConnection = (
  state: IWebSocketState,
  id: string,
  pseudoID: string
) => {
  if (state.ws != null) {
    state.ws.destroy();
  }

  if (id == null || pseudoID == null) {
    return state;
  }

  const config = { id, pseudoID };
  return { ws: new WebSocketProvider(config) };
};

const fetchInitialGameData = (state: IWebSocketState) => {
  if (state.ws == null) {
    return state;
  }

  state.ws.onSend({
    resource: WSResource.GAME_SNAPSHOT,
    action: WSAction.GAME,
    data: []
  });

  return state;
};

const sendData = <T>(state: IWebSocketState, data: IWSRequest<T>) => {
  if (state.ws == null) {
    return state;
  }
  state.ws.onSend(data);
};

const closeConnection = (state: IWebSocketState) => {
  if (state.ws == null) {
    return state;
  }

  state.ws.destroy();
  return { ws: null };
};

type Actions = WebSocketActions;

export const webSocketReducer = (
  state: IWebSocketState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case OPEN_WS_CONNECTION_ACTION:
      return openConnection(state, action.id, action.pseudoID);
    case OPENED_WS_CONNECTION_ACTION:
      return fetchInitialGameData(state);
    case SEND_WS_DATA_ACTION:
      sendData(state, action.data);
      return state;
    case CLOSE_WS_CONNECTION_ACTION:
      return closeConnection(state);
    default:
      return state;
  }
};
