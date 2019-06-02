import { IWSResponse } from "../providers/WebSocketProvider";
import { TMap } from "../shared/utils/MapUtils";
import { IPlayer } from "../reducers/EntityReducer";
import { IControlsState } from "../reducers/ControlsReducer";

export const CREATE_GAME_INSTANCE_ACTION = "CREATE_GAME_INSTANCE_ACTION";
export interface ICreateGameInstanceAction {
  wrapper: Element;
  type: typeof CREATE_GAME_INSTANCE_ACTION;
}

export const createGameInstance = (wrapper: Element) => ({
  wrapper,
  type: CREATE_GAME_INSTANCE_ACTION
});

export const RECEIVED_INITIAL_GAME_DATA_ACTION =
  "RECEIVED_INITIAL_GAME_DATA_ACTION";
export interface IReceivedInitialGameDataAction {
  data: IWSResponse<TMap>;
  type: typeof RECEIVED_INITIAL_GAME_DATA_ACTION;
}

export const receivedInitialGameData = (data: IWSResponse<TMap>) => ({
  data,
  type: RECEIVED_INITIAL_GAME_DATA_ACTION
});

export const ON_UPADTE_RENDERER_ACTION = "ON_UPADTE_RENDERER_ACTION";
export interface IOnUpdateRendererAction {
  entities: IPlayer;
  controls: IControlsState;
  willSend: boolean;
  type: typeof ON_UPADTE_RENDERER_ACTION;
}

export const updateRenderer = (
  player: IPlayer,
  controls: IControlsState,
  willSend: boolean
) => ({
  player,
  controls,
  willSend,
  type: ON_UPADTE_RENDERER_ACTION
});

export const DESTROY_GAME_INSTANCE_ACTION = "DESTROY_GAME_INSTANCE_ACTION";
export interface IDestroyGameInstanceAction {
  type: typeof DESTROY_GAME_INSTANCE_ACTION;
}

export const destroyGameInstance = () => ({
  type: DESTROY_GAME_INSTANCE_ACTION
});

export type GameActions =
  | ICreateGameInstanceAction
  | IReceivedInitialGameDataAction
  | IOnUpdateRendererAction
  | IDestroyGameInstanceAction;
