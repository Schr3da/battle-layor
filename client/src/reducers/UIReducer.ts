import { isMobile } from "../shared/utils/BrowserUtils";
import { SET_LOADING_ACTION, ON_INPUT_CHANGE_ACTION, UIActions } from '../actions/UIActions';

export type InputFields = {
	[key: string]: string | number;
}

export enum InputField {
  PlayerName = "player"
}

export interface IUIState {
  isMobile: boolean;
	isLoading: boolean;
	inputs: InputFields;
}

const initialState = {
  isMobile: isMobile(),
  isLoading: false,
	inputs: {},
};

const setLoading = (state: IUIState, isLoading: boolean) => ({
	...state, isLoading
})

const handleInputChanged = (state: IUIState, key: string, value: string | number) => ({
	...state, 
	inputs: { 
		...state.inputs,
		[key]: value,
	}
});

type Actions = UIActions;

export const uiReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ON_INPUT_CHANGE_ACTION:
    	return handleInputChanged(state, action.key, action.value);
    case SET_LOADING_ACTION:
    	return setLoading(state, action.isLoading);
    default:
      return state;
  }
};
