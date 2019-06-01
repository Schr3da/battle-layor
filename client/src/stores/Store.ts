import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import { IEntityState } from "../reducers/EntityReducer";
import { IUIState } from "../reducers/UIReducer";
import { reducers } from "../reducers";
import { IMapState } from '../reducers/MapReducer';

export interface IStore {
  entities: IEntityState;
  ui: IUIState;
  map: IMapState; 
}

export const getStore = () => {
  if ((window as any).store == null) {
    (window as any).store = createStore(
    	reducers,
    	applyMiddleware(thunk)
    )
  }
  return (window as any).store;
};
