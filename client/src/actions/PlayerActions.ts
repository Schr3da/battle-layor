import { IVector2d } from "../shared/vector/Vector2d";

export const SET_PLAYER_ID_ACTION = "SET_PLAYER_ID_ACTION";
export interface ISetPlayerIdAction {
  id: string | null;
  type: typeof SET_PLAYER_ID_ACTION;
}

export const SetPlayerId = (id: string | null) => ({
  id,
  type: SET_PLAYER_ID_ACTION
});

export const SET_PLAYER_PSEUDO_ID_ACTION = "SET_PLAYER_PSEUDO_ID_ACTION";
export interface ISetPlayerPseudoIdAction {
  pseudoID: string | null;
  type: typeof SET_PLAYER_PSEUDO_ID_ACTION;
}

export const SetPlayerPseudoID = (pseudoID: string | null) => ({
  pseudoID,
  type: SET_PLAYER_PSEUDO_ID_ACTION
});

export const SET_PLAYER_IDS_ACTION = "SET_PLAYER_IDS_ACTION";
export interface ISetPlayerIdsAction {
	id: string;
	pseudoID: string;
	type: typeof SET_PLAYER_IDS_ACTION;
}

export const SetPlayerIds = (id: string | null, pseudoID: string | null) => ({
	id, 
	pseudoID,
	type: SET_PLAYER_IDS_ACTION,
})

export const SET_PLAYER_MOVE_SPEED_ACTION = "SET_PLAYER_MOVE_SPEED_ACTION";
export interface ISetPlayerMoveSpeedAction {
  moveSpeed: number;
  type: typeof SET_PLAYER_MOVE_SPEED_ACTION;
}

export const SetPlayerSpeed = (moveSpeed: number) => ({
  moveSpeed,
  type: SET_PLAYER_MOVE_SPEED_ACTION
});

export const SET_PLAYER_ROTATION_SPEED_ACTION =
  "SET_PLAYER_ROTATION_SPEED_ACTION";
export interface ISetPlayerRotationSpeedAction {
  rotSpeed: number;
  type: typeof SET_PLAYER_ROTATION_SPEED_ACTION;
}

export const SetPlayerRotationSpeed = (rotSpeed: number) => ({
  rotSpeed,
  type: SET_PLAYER_ROTATION_SPEED_ACTION
});

export const SET_PLAYER_POSITION_ACTION = "SET_PLAYER_POSITION_ACTION";
export interface ISetPlayerPositionAction {
  position: IVector2d;
  type: typeof SET_PLAYER_POSITION_ACTION;
}

export const SetPlayerPosition = (position: IVector2d) => ({
  position,
  type: SET_PLAYER_ROTATION_SPEED_ACTION
});

export const SET_PLAYER_DIRECTION_ACTION = "SET_PLAYER_DIRECTION_ACTION";
export interface ISetPlayerDirectionAction {
  direction: IVector2d;
  type: typeof SET_PLAYER_DIRECTION_ACTION;
}

export const SetPlayerDirection = (direction: IVector2d) => ({
  direction,
  type: SET_PLAYER_DIRECTION_ACTION
});

export const SET_PLAYER_PLANE_ACTION = "SET_PLAYER_PLANE_ACTION";
export interface ISetPlayerPlaneAction {
  plane: IVector2d;
  type: typeof SET_PLAYER_PLANE_ACTION;
}

export const SetPlayerPlane = (plane: IVector2d) => ({
  plane,
  type: SET_PLAYER_PLANE_ACTION
});

export type PlayerActions =
  | ISetPlayerIdAction
  | ISetPlayerPseudoIdAction
  | ISetPlayerIdsAction
  | ISetPlayerRotationSpeedAction
  | ISetPlayerMoveSpeedAction
  | ISetPlayerPositionAction
  | ISetPlayerDirectionAction
  | ISetPlayerPlaneAction;
