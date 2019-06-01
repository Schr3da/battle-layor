export const UPDATE_ENEMY_WITH_DATA = "UPDATE_ENEMY_WITH_DATA";
interface IUpdateEnemyWithData {
  data: any;
  type: typeof UPDATE_ENEMY_WITH_DATA;
}

export const updateEnemyWithData = (data: any) => ({
  data,
  type: UPDATE_ENEMY_WITH_DATA
});

export type EnemyActions = IUpdateEnemyWithData;
