import { combineReducers } from "redux";

import { entityReducer } from "./EntityReducer";
import { controlsReducer } from "./ControlsReducer";
import { uiReducer } from "./UIReducer";
import { mapReducer } from "./MapReducer";

export const reducers = combineReducers({
  controls: controlsReducer,
  entities: entityReducer,
  map: mapReducer,
  ui: uiReducer
});
