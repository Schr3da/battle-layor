import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import { IEntityState } from "../reducers/EntityReducer";
import { IUIState } from "../reducers/UIReducer";
import { IMapState } from "../reducers/MapReducer";
import { IControlsState } from "../reducers/ControlsReducer";
import { reducers } from "../reducers";
import { IWebSocketState } from "../reducers/WebSocketReducer";
import { IGameState } from "../reducers/GameReducer";

export interface IStore {
  ui: IUIState;
  controls: IControlsState;
  entities: IEntityState;
  map: IMapState;
  ws: IWebSocketState;
  game: IGameState;
}

export const initStore = () =>
  (window.store = createStore(reducers, applyMiddleware(thunk)));

const getStore = () => {
  if (window.store == null) {
    console.error("store is null");
  }
  return window.store;
};

export const getStateOfStore = () => {
  const store = getStore();
  return store.getState() as IStore;
};
