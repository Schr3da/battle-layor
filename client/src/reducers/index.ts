import { combineReducers } from "redux";

import { entityReducer } from "./EntityReducer";
import { controlsReducer } from "./ControlsReducer";
import { uiReducer } from "./UIReducer";
import { mapReducer } from "./MapReducer";
import { webSocketReducer } from "./WebSocketReducer";
import { gameReducer } from "./GameReducer";

export const reducers = combineReducers({
  ui: uiReducer,
  ws: webSocketReducer,
  game: gameReducer,
  controls: controlsReducer,
  entities: entityReducer,
  map: mapReducer
});
