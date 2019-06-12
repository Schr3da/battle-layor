import { IWSEntity } from "../shared/utils/EntityUtils";

export const ADD_ENEMY_ACTION = "ADD_ENEMY";
interface IAddEnemy {
	data: IWSEntity;
	type: typeof ADD_ENEMY_ACTION;
}

export const addEnemy = (data: IWSEntity) => ({
	data,
	type: ADD_ENEMY_ACTION,
})

export const UPDATE_ENEMY_WITH_DATA_ACTION = "UPDATE_ENEMY_WITH_DATA";
interface IUpdateEnemyWithData {
  data: IWSEntity;
  type: typeof UPDATE_ENEMY_WITH_DATA_ACTION;
}

export const updateEnemyWithData = (data: IWSEntity) => ({
  data,
  type: UPDATE_ENEMY_WITH_DATA_ACTION
});

export const REMOVE_ENEMY_ACTION = "REMOVE_ENEMY";
interface IRemoveEnemy {
	pseudoID: string;
	type: typeof REMOVE_ENEMY_ACTION;
}

export const removeEnemy = (data: IWSEntity) => ({
	pseudoID: data.pseudoID,
	type: REMOVE_ENEMY_ACTION,
})

export type EnemyActions = IAddEnemy | IUpdateEnemyWithData | IRemoveEnemy;
