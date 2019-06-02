import { Game } from "../components/game/game-components/Game";
import {
  GameActions,
  RECEIVED_INITIAL_GAME_DATA_ACTION,
  CREATE_GAME_INSTANCE_ACTION,
  DESTROY_GAME_INSTANCE_ACTION
} from "../actions/GameActions";
import {
  WebSocketActions,
  OPENED_WS_CONNECTION_ACTION
} from "../actions/WebSocketActions";

export interface IGameState {
  instance: Game | null;
}

const initialState = {
  instance: null
};

const createInstance = (state: IGameState, wrapper: Element) => {
  return {
    ...state,
    instance: new Game(wrapper)
  };
};

const openedConnection = (state: IGameState) => {
  if (state.instance == null) {
    return state;
  }
  state.instance.init();
  return state;
};

const destroyInstance = (state: IGameState) => {
  if (state.instance == null) {
    return state;
  }

  state.instance.destroy();
  return {
    ...state,
    instance: null
  };
};

type Actions = GameActions | WebSocketActions;

export const gameReducer = (
  state: IGameState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case CREATE_GAME_INSTANCE_ACTION:
      return createInstance(state, action.wrapper);
    case OPENED_WS_CONNECTION_ACTION:
      return openedConnection(state);
    case RECEIVED_INITIAL_GAME_DATA_ACTION:
      return state;
    case DESTROY_GAME_INSTANCE_ACTION:
      return destroyInstance(state);
    default:
      return state;
  }
};
