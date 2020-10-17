import { createStore, combineReducers } from 'redux';
import { logoutReducer } from './main/reducer';

const reducers = combineReducers({
    logoutReducer
});

const store = createStore(
    reducers
);

export default store;