import { type as loginActionType } from '../actions/loginAction';
import { Action } from './../../interfaces/action';

const defaultState = true;

const reducer = (state = defaultState, { type, payload }: Action) => {
    switch (type) {
        case loginActionType:{
            return payload
        }
        default:
            return state;
    }
}

export default reducer;