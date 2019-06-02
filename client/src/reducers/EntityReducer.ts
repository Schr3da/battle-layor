import { IVector2d, createVector2d } from "../shared/vector/Vector2d";
import { EnemyActions, UPDATE_ENEMY_WITH_DATA } from "../actions/EnemyActions";

import {
  PlayerActions,
  SET_PLAYER_ROTATION_SPEED_ACTION,
  SET_PLAYER_MOVE_SPEED_ACTION,
  SET_PLAYER_IDS_ACTION,
  UPDATE_PLAYER_WITH_DATA_ACTION,
  IUpdatePlayerWithDataAction
} from "../actions/PlayerActions";

import {
  RECEIVED_INITIAL_GAME_DATA_ACTION,
  GameActions
} from "../actions/GameActions";
import { IWSEntity } from "../shared/utils/EntityUtils";

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

const setPlayerIds = (
  state: IEntityState,
  id: string | null,
  pseudoID: string | null
) => {
  return { ...state, player: { ...state.player, id, pseudoID } };
};

const setPlayerRotationSpeed = (state: IEntityState, rotSpeed: number) => {
  return { ...state, player: { ...state.player, rotSpeed } };
};

const setPlayerMoveSpeed = (state: IEntityState, moveSpeed: number) => {
  return { ...state, player: { ...state.player, moveSpeed } };
};

const setInitialPosition = (state: IEntityState) => {
  return {
    ...state,
    player: {
      ...state.player,
      position: {
        x: 20,
        y: 20
      }
    }
  };
};

const updatePlayerData = (
  state: IEntityState,
  action: IUpdatePlayerWithDataAction
) => {
  return {
    ...state,
    player: {
      ...state.player,
      position: action.position,
      plane: action.plane,
      direction: action.direction
    }
  };
};

const updateEnemyData = (state: IEntityState, data: IWSEntity) => {
  return {
    ...state,
    enemies: {
      ...state.enemies,
      [data.pseudoID]: data
    }
  };
};

type Actions = EnemyActions | PlayerActions | GameActions;

export const entityReducer = (
  state: IEntityState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case RECEIVED_INITIAL_GAME_DATA_ACTION:
      return setInitialPosition(state);
    case SET_PLAYER_IDS_ACTION:
      return setPlayerIds(state, action.id, action.pseudoID);
    case SET_PLAYER_ROTATION_SPEED_ACTION:
      return setPlayerRotationSpeed(state, action.rotSpeed);
    case SET_PLAYER_MOVE_SPEED_ACTION:
      return setPlayerMoveSpeed(state, action.moveSpeed);
    case UPDATE_PLAYER_WITH_DATA_ACTION:
      return updatePlayerData(state, action);
    case UPDATE_ENEMY_WITH_DATA:
      return updateEnemyData(state, action.data);
    default:
      return state;
  }
};
