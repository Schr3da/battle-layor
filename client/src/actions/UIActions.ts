import { IStore } from '../stores/Store';
import { getNullableInputValue } from '../shared/utils/InputUtils';
import { InputField } from '../reducers/UIReducer';
import { registerNewPlayer, unregisterPlayer } from '../providers/RestProvider';
import { SetPlayerIds } from './PlayerActions';

export const ON_INPUT_CHANGE_ACTION = "ON_INPUT_CHANGE_ACTION";
export interface IOnInputChangeAction {
	key: string;
	value: string | number;
	type: typeof ON_INPUT_CHANGE_ACTION;
}

export const handleInputChange = (key: string, value: string | number) => ({
	key, 
	value,
	type: ON_INPUT_CHANGE_ACTION,
})

export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export interface ISetLoadingAction {
	isLoading: boolean;
	type: typeof SET_LOADING_ACTION;
}

export const setLoading = (isLoading: boolean) => ({
	isLoading,
	type: SET_LOADING_ACTION,
});

export const ON_ERROR_ACTION = "ON_ERROR_ACTION";
export interface IOnErrorAction {
	type: typeof ON_ERROR_ACTION;
}

export const handleError = () => ({
	type: ON_ERROR_ACTION,
})

export const ON_REGISTER_ACTION = "ON_REGISTER_ACTION";
export interface IOnRegisterAction {
	name: string;
	type: typeof ON_REGISTER_ACTION
}

export const handleRegister = () => {
	return async (dispatch, getState: () => IStore ) => {
		const { ui } = getState(),
		name = getNullableInputValue(ui.inputs, InputField.PlayerName) as string;
		
    if (name == null || name.trim().length === 0) {
      return;
    }

		dispatch(setLoading(true));
		const d = await registerNewPlayer(name);
		dispatch(setLoading(false));
	
		if (d == null) {
			return;
		}

		dispatch(SetPlayerIds(d.data.id, d.data.pseudoID));	
	}
}

export const ON_UNREGISTER_ACTION = "ON_UNREGISTER_ACTION";
export interface IOnUnregisterAction {
	type: typeof ON_UNREGISTER_ACTION;
}

export const handleUnregister = () => {
	return async (dispatch, getState: () => IStore ) => {
		const { entities }= getState();
		
		dispatch(setLoading(true));
		await unregisterPlayer(entities.player.id);
		dispatch(setLoading(false));
	
		dispatch(SetPlayerIds(null, null))
	}
}

export type UIActions = ISetLoadingAction | IOnRegisterAction | IOnUnregisterAction | IOnInputChangeAction;
