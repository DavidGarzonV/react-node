import { validatingType, validateSuccessType, validateFailedType } from '../actions/validateLogin';
import { Action } from './../../interfaces/action';

const defaultState = {
	status: false,
	isLoading: false
};

const reducer = (state = defaultState, { type, payload }: Action) => {
	switch (type) {
		case validateSuccessType: {
			return { ...state, status: payload, isLoading: false };
		}
		case validatingType: {
			return { ...state, isLoading: true };
		}
		default:
			return state;
	}
}

export default reducer;