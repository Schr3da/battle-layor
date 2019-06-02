import { VirtualGamePadEnum } from "../reducers/ControlsReducer";

export const ON_VIRTUAL_GAMEPAD_CHANGED_ACTION =
  "ON_VIRTUAL_GAMEPAD_CHANGED_ACTION";
export interface IOnVirtualGamePadChangedAction {
  axis: VirtualGamePadEnum;
  keyCode: number;
  value: boolean;
  type: typeof ON_VIRTUAL_GAMEPAD_CHANGED_ACTION;
}

export const setValueForVirtualGamePad = (
  axis: VirtualGamePadEnum,
  keyCode: number
) => ({
  axis,
  keyCode,
  type: ON_VIRTUAL_GAMEPAD_CHANGED_ACTION
});

export type VirtualGamePadActions = IOnVirtualGamePadChangedAction;
