import { type as loadingActionType } from '../actions/loadingAction';
import { Action } from './../../interfaces/action';

const defaultState = {
    loading: false
};

const reducer = (state = defaultState, { type, payload }: Action) => {
    switch (type) {
        case loadingActionType:{
            return { ...state, loading: payload };
        }
        default:
            return state;
    }
}

export default reducer;