import { IWSEntity } from "../shared/utils/EntityUtils";

export const UPDATE_ENEMY_WITH_DATA = "UPDATE_ENEMY_WITH_DATA";
interface IUpdateEnemyWithData {
  data: any;
  type: typeof UPDATE_ENEMY_WITH_DATA;
}

export const updateEnemyWithData = (data: IWSEntity) => ({
  data,
  type: UPDATE_ENEMY_WITH_DATA
});

export type EnemyActions = IUpdateEnemyWithData;
