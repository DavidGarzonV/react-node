import { type as loginActionType } from '../actions/loginAction';
import { Action } from './../../interfaces/action';

const defaultState = {
    isLogin: false
};

const reducer = (state = defaultState, { type, payload }: Action) => {
    switch (type) {
        case loginActionType:{
            return { ...state, isLogin: payload };
        }
        default:
            return state;
    }
}

export default reducer;