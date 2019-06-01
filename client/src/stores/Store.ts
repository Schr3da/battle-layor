import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import { IEntityState } from "../reducers/EntityReducer";
import { IUIState } from "../reducers/UIReducer";
import { IMapState } from "../reducers/MapReducer";
import { IControlsState } from "../reducers/ControlsReducer";
import { reducers } from "../reducers";

export interface IStore {
  ui: IUIState;
  controls: IControlsState;
  entities: IEntityState;
  map: IMapState;
}

export const getStore = () => {
  if (window.store == null) {
    window.store = createStore(reducers, applyMiddleware(thunk));
  }
  return window.store;
};
