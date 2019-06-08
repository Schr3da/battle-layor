import { isMobile } from "../shared/utils/BrowserUtils";
import {
  SET_LOADING_ACTION,
  ON_INPUT_CHANGE_ACTION,
  UIActions
} from "../actions/UIActions";

export type InputFields = {
  [key: string]: string | number;
};

export enum InputField {
  PlayerName = "player"
}

export enum Theme {
  Light = "light-theme",
  Dark = "dark-theme"
}

export interface IUIState {
  theme: string;
  copyright: string;
  isMobile: boolean;
  isLoading: boolean;
  inputs: InputFields;
}

const initialState = {
  theme: Theme.Light,
  copyright: `Copyright © ${new Date().getUTCFullYear()} Georg Strieder. All rights reserved.`,
  isMobile: isMobile(),
  isLoading: false,
  inputs: {}
};

const setLoading = (state: IUIState, isLoading: boolean) => ({
  ...state,
  isLoading
});

const handleInputChanged = (
  state: IUIState,
  key: string,
  value: string | number
) => ({
  ...state,
  inputs: {
    ...state.inputs,
    [key]: value
  }
});

type Actions = UIActions;

export const uiReducer = (state: IUIState = initialState, action: Actions) => {
  switch (action.type) {
    case ON_INPUT_CHANGE_ACTION:
      return handleInputChanged(state, action.key, action.value);
    case SET_LOADING_ACTION:
      return setLoading(state, action.isLoading);
    default:
      return state;
  }
};
