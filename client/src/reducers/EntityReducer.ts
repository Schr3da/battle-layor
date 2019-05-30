import { IVector2d, createVector2d } from "../shared/vector/Vector2d";
import {
  PlayerActions,
  SET_PLAYER_ID_ACTION,
  SET_PLAYER_PSEUDO_ID_ACTION,
  SET_PLAYER_DIRECTION_ACTION,
  SET_PLAYER_POSITION_ACTION,
  SET_PLAYER_PLANE_ACTION,
  SET_PLAYER_ROTATION_SPEED_ACTION,
  SET_PLAYER_MOVE_SPEED_ACTION
} from "../actions/PlayerActions";

export interface IEntity {
  position: IVector2d;
  direction: IVector2d;
  plane: IVector2d;
}

export interface IPlayer extends IEntity {
  id: string | null;
  pseudoID: string | null;
  moveSpeed: number;
  rotSpeed: number;
  prevDirX: number;
  prevPlaneX: number;
}

export interface IEnemy extends IEntity {
  pseudoID: string;
}

type TEnemies = { [id: string]: IEnemy };

export interface IEntityState {
  player: IPlayer;
  enemies: TEnemies;
}

const initialState: IEntityState = {
  player: {
    id: null,
    pseudoID: null,
    moveSpeed: 0,
    rotSpeed: 0,
    prevDirX: 0,
    prevPlaneX: 0,
    position: createVector2d(0, 0),
    direction: createVector2d(-1, 0),
    plane: createVector2d(0, 1)
  },
  enemies: {}
};

const setPlayerId = (state: IEntityState, id: string | null) => {
  return { ...state, player: { ...state.player, id } };
};

const setPlayerPseudoId = (state: IEntityState, pseudoID: string | null) => {
  return { ...state, player: { ...state.player, pseudoID } };
};

const setPlayerDirection = (state: IEntityState, direction: IVector2d) => {
  return { ...state, player: { ...state.player, direction } };
};

const setPlayerPlane = (state: IEntityState, plane: IVector2d) => {
  return { ...state, player: { ...state.player, plane } };
};

const setPlayerPosition = (state: IEntityState, plane: IVector2d) => {
  return { ...state, player: { ...state.player, plane } };
};

const setPlayerRotationSpeed = (state: IEntityState, rotSpeed: number) => {
  return { ...state, player: { ...state.player, rotSpeed } };
};

const setPlayerMoveSpeed = (state: IEntityState, moveSpeed: number) => {
  return { ...state, player: { ...state.player, moveSpeed } };
};

type Actions = PlayerActions;

export const entityReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case SET_PLAYER_ID_ACTION:
      return setPlayerId(state, action.id);
    case SET_PLAYER_PSEUDO_ID_ACTION:
      return setPlayerPseudoId(state, action.pseudoID);
    case SET_PLAYER_DIRECTION_ACTION:
      return setPlayerDirection(state, action.direction);
    case SET_PLAYER_PLANE_ACTION:
      return setPlayerPlane(state, action.plane);
    case SET_PLAYER_POSITION_ACTION:
      return setPlayerPosition(state, action.position);
    case SET_PLAYER_ROTATION_SPEED_ACTION:
      return setPlayerRotationSpeed(state, action.rotSpeed);
    case SET_PLAYER_MOVE_SPEED_ACTION:
      return setPlayerMoveSpeed(state, action.moveSpeed);
    default:
      return state;
  }
};
