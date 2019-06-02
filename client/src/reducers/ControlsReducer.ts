import {
  ON_VIRTUAL_GAMEPAD_CHANGED_ACTION,
  VirtualGamePadActions
} from "../actions/VirtualGamePadActions";
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

export enum VirtualGamePadEnum {
  xAxis,
  yAxis
}

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

const setValueForVirtualGamePad = (
  state: IControlsState,
  axis: VirtualGamePadEnum,
  keyCode: number
) => {
  const activeKeys = { ...state.activeKeys };

  switch (axis) {
    case VirtualGamePadEnum.yAxis:
      activeKeys[SupportedKeys.Down] =
        keyCode == SupportedKeys.Down ? true : false;
      activeKeys[SupportedKeys.Up] = keyCode == SupportedKeys.Up ? true : false;
      break;
    case VirtualGamePadEnum.xAxis:
      activeKeys[SupportedKeys.Left] =
        keyCode == SupportedKeys.Left ? true : false;
      activeKeys[SupportedKeys.Right] =
        keyCode == SupportedKeys.Right ? true : false;
      break;
    default:
      break;
  }

  return {
    ...state,
    activeKeys
  };
};

type Actions = ControlActions | VirtualGamePadActions;

export const controlsReducer = (
  state: IControlsState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case ON_VIRTUAL_GAMEPAD_CHANGED_ACTION:
      return setValueForVirtualGamePad(state, action.axis, action.keyCode);
    case SET_VALUE_FOR_KEY_CODE:
      return setValueForKeyCode(state, action.keyCode, action.value);
    default:
      return state;
  }
};
