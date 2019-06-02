import { IVector2d } from "../shared/vector/Vector2d";

export const SET_PLAYER_IDS_ACTION = "SET_PLAYER_IDS_ACTION";
export interface ISetPlayerIdsAction {
  id: string;
  pseudoID: string;
  type: typeof SET_PLAYER_IDS_ACTION;
}

export const setPlayerIds = (id: string | null, pseudoID: string | null) => ({
  id,
  pseudoID,
  type: SET_PLAYER_IDS_ACTION
});

export const SET_PLAYER_MOVE_SPEED_ACTION = "SET_PLAYER_MOVE_SPEED_ACTION";
export interface ISetPlayerMoveSpeedAction {
  moveSpeed: number;
  type: typeof SET_PLAYER_MOVE_SPEED_ACTION;
}

export const setPlayerSpeed = (moveSpeed: number) => ({
  moveSpeed,
  type: SET_PLAYER_MOVE_SPEED_ACTION
});

export const SET_PLAYER_ROTATION_SPEED_ACTION =
  "SET_PLAYER_ROTATION_SPEED_ACTION";
export interface ISetPlayerRotationSpeedAction {
  rotSpeed: number;
  type: typeof SET_PLAYER_ROTATION_SPEED_ACTION;
}

export const setPlayerRotationSpeed = (rotSpeed: number) => ({
  rotSpeed,
  type: SET_PLAYER_ROTATION_SPEED_ACTION
});

export const UPDATE_PLAYER_WITH_DATA_ACTION = "UPDATE_PLAYER_WITH_DATA_ACTION";
export interface IUpdatePlayerWithDataAction {
  position: IVector2d;
  direction: IVector2d;
  plane: IVector2d;
  type: typeof UPDATE_PLAYER_WITH_DATA_ACTION;
}

export const updatePlayerWithData = (
  position: IVector2d,
  direction: IVector2d,
  plane: IVector2d
) => ({
  position,
  direction,
  plane,
  type: UPDATE_PLAYER_WITH_DATA_ACTION
});

export type PlayerActions =
  | ISetPlayerIdsAction
  | IUpdatePlayerWithDataAction
  | ISetPlayerRotationSpeedAction
  | ISetPlayerMoveSpeedAction;
