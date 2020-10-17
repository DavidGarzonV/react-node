import { LoggedIn } from './types';

const init: LoggedIn = {
    isLogged: false
};

export function logoutReducer(state: LoggedIn = init,
    action: any): LoggedIn {
    switch (action.type) {
        default:
            return state;
    }
}