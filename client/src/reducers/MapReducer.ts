import { TMap } from "../shared/utils/MapUtils";
import { MapActions } from "../actions/MapActions";
import { IWSResponse } from "../providers/WebSocketProvider";
import {
  GameActions,
  RECEIVED_INITIAL_GAME_DATA_ACTION
} from "../actions/GameActions";

export interface IMapState {
  data: TMap | null;
}

const initialState = {
  data: null
};

const handleInitalData = (d: IWSResponse<TMap>) => ({
  data: [...d.data]
});

type Actions = MapActions | GameActions;

export const mapReducer = (
  state: IMapState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case RECEIVED_INITIAL_GAME_DATA_ACTION:
      return handleInitalData(action.data);
    default:
      return state;
  }
};
