import { combineReducers } from "redux";
import { uiReducer } from "./UIReducer";
import { entityReducer } from "./EntityReducer";
import { controlsReducer } from "./ControlsReducer";

export const reducers = combineReducers({
  ui: uiReducer,
  entities: entityReducer,
  controls: controlsReducer
});
