import {
  ControlActions,
  SET_VALUE_FOR_KEY_CODE
} from "../actions/ControlsActions";

export const SupportedKeys = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Space: 32,
  End: 0
};

export interface IControlsState {
  activeKeys: { [key: number]: boolean };
}

const initialState = {
  activeKeys: {
    [SupportedKeys.Left]: false,
    [SupportedKeys.Right]: false,
    [SupportedKeys.Up]: false,
    [SupportedKeys.Down]: false,
    [SupportedKeys.Space]: false,
    [SupportedKeys.End]: false
  }
};

const setValueForKeyCode = (
  state: IControlsState,
  keyCode: number,
  value: boolean
) => ({
  ...state,
  activeKeys: { ...state.activeKeys, [keyCode]: value }
});

type Actions = ControlActions;

export const controlsReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case SET_VALUE_FOR_KEY_CODE:
      return setValueForKeyCode(state, action.keyCode, action.value);
    default:
      return state;
  }
};
