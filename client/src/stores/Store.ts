import { createStore } from "redux";

import { IEntityState } from "../reducers/EntityReducer";
import { UIState } from "../reducers/UIReducer";
import { reducers } from "../reducers";

export interface IStore {
  entities: IEntityState;
  ui: UIState;
}

export const getStore = () => {
  if ((window as any).store == null) {
    (window as any).store = createStore(reducers);
  }
  return (window as any).store;
};
