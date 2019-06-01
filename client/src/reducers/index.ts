import { combineReducers } from "redux";
import { uiReducer } from "./UIReducer";
import { entityReducer } from "./EntityReducer";
import { controlsReducer } from "./ControlsReducer";
import { mapReducer } from './MapReducer';

export const reducers = combineReducers({
  ui: uiReducer,
  controls: controlsReducer,
  entities: entityReducer,
	map: mapReducer,
});
