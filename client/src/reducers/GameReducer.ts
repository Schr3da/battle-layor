import { Game } from "../components/game/game-components/Game";
import { UIActions, ON_CONTENT_RESIZE_ACTION } from "../actions/UIActions";
import { GameSettings } from "../components/Settings";
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
  canvas: {
    width: number;
    height: number;
    resolution: number;
  };
}

const calculateResolution = (width: number) => width / GameSettings.resolution;

const createInstance = (state: IGameState, wrapper: HTMLDivElement) => {
  const { width, height } = state.canvas;

  return {
    ...state,
    instance: new Game(wrapper, width, height)
  };
};

const setCanvasSize = (state: IGameState, width: number, height: number) => {
  const resolution = calculateResolution(width);
  return {
    ...state,
    canvas: { width, height, resolution }
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

const initialState = {
  instance: null,
  canvas: {
    width: 0,
    height: 0,
    resolution: calculateResolution(window.innerWidth)
  }
};

type Actions = GameActions | WebSocketActions | UIActions;

export const gameReducer = (
  state: IGameState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case ON_CONTENT_RESIZE_ACTION:
      return setCanvasSize(state, action.width, action.height);
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
