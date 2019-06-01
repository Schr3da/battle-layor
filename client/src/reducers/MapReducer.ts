import { TMap } from "../shared/utils/MapUtils";
import { MapActions } from '../actions/MapActions';

export interface IMapState {
	data: TMap;
}

const initialState = {
	data: null,
}

type Actions = MapActions;

export const mapReducer = (state = initialState, action: Actions) => {
	switch(action.type) {
		default:
			return state;
	}
}
