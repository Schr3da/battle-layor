import { IStore } from "../stores/Store";
import { getNullableInputValue } from "../shared/utils/InputUtils";
import { InputField } from "../reducers/UIReducer";
import { registerNewPlayer, unregisterPlayer } from "../providers/RestProvider";
import { setPlayerIds } from "./PlayerActions";
import {
  closeWebSocketConnection,
  OPEN_WS_CONNECTION_ACTION
} from "./WebSocketActions";

export const ON_INPUT_CHANGE_ACTION = "ON_INPUT_CHANGE_ACTION";
export interface IOnInputChangeAction {
  key: string;
  value: string | number;
  type: typeof ON_INPUT_CHANGE_ACTION;
}

export const ON_CONTENT_RESIZE_ACTION = "ON_CONTENT_RESIZE_ACTION";
export interface IOnContentResize {
  width: number;
  height: number;
  type: typeof ON_CONTENT_RESIZE_ACTION;
}

export const handleContentResize = (width: number, height: number) => ({
  width,
  height,
  type: ON_CONTENT_RESIZE_ACTION
});

export const handleInputChange = (key: string, value: string | number) => ({
  key,
  value,
  type: ON_INPUT_CHANGE_ACTION
});

export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export interface ISetLoadingAction {
  isLoading: boolean;
  type: typeof SET_LOADING_ACTION;
}

export const setLoading = (isLoading: boolean) => ({
  isLoading,
  type: SET_LOADING_ACTION
});

export const ON_ERROR_ACTION = "ON_ERROR_ACTION";
export interface IOnErrorAction {
  type: typeof ON_ERROR_ACTION;
}

export const handleError = () => ({
  type: ON_ERROR_ACTION
});

export const ON_REGISTER_ACTION = "ON_REGISTER_ACTION";
export interface IOnRegisterAction {
  name: string;
  type: typeof ON_REGISTER_ACTION;
}

export const handleRegister = () => {
  return async (dispatch, getState: () => IStore) => {
    const { ui } = getState(),
      name = getNullableInputValue(ui.inputs, InputField.PlayerName) as string;

    if (name == null || name.trim().length === 0) {
      return;
    }

    dispatch(setLoading(true));
    const d = await registerNewPlayer(name);
    dispatch(setLoading(false));

    if (d == null || d.data == null) {
      return;
    }

    const { id, pseudoID } = d.data;

    dispatch(setPlayerIds(id, pseudoID));

    dispatch({
      id,
      pseudoID,
      type: OPEN_WS_CONNECTION_ACTION
    });
  };
};

export const ON_UNREGISTER_ACTION = "ON_UNREGISTER_ACTION";
export interface IOnUnregisterAction {
  type: typeof ON_UNREGISTER_ACTION;
}

export const handleUnregister = () => {
  return async (dispatch, getState: () => IStore) => {
    const { entities } = getState();

    dispatch(setLoading(true));
    await unregisterPlayer(entities.player.id);
    dispatch(setLoading(false));

    dispatch(setPlayerIds(null, null));
    dispatch(closeWebSocketConnection());
  };
};

export type UIActions =
  | ISetLoadingAction
  | IOnContentResize
  | IOnRegisterAction
  | IOnUnregisterAction
  | IOnInputChangeAction;
