export const SET_VALUE_FOR_KEY_CODE = "SET_VALUE_FOR_KEY_CODE";
interface ISetValueForKeyCode {
  keyCode: number;
  value: boolean;
  type: typeof SET_VALUE_FOR_KEY_CODE;
}

export const setValueForKeyCode = (keyCode: number, value: boolean) => ({
  keyCode,
  value,
  type: SET_VALUE_FOR_KEY_CODE
});

export type ControlActions = ISetValueForKeyCode;
