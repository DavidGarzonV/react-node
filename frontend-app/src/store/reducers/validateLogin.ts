import { validatingType, validateSuccessType, validateFailedType } from '../actions/validateLogin';
import { Action } from './../../interfaces/action';

const defaultState = {
	status: false,
	isLoading: false,
	failed: false
};

//Reducer for saga auth
const reducer = (state = defaultState, { type, payload }: Action) => {
	switch (type) {
		case validateSuccessType: {
			return { ...state, status: payload, isLoading: false };
		}
		case validatingType: {
			return { ...state, isLoading: true };
		}
		case validateFailedType: {
			return { ...state, failed: true, isLoading: false };
		}
		default:
			return state;
	}
}

export default reducer;