import { TMap } from "../shared/utils/MapUtils";

export const SET_MAP_ACTION = "SET_MAP_ACTION";
export interface ISetMapAction {
  map: TMap;
  type: typeof SET_MAP_ACTION;
}

export const setMap = (map: TMap | null) => ({
  map,
  type: SET_MAP_ACTION
});

export type MapActions = ISetMapAction;
