
import { createStore, combineReducers } from 'redux';
import login from './reducers/login';

const reducer = combineReducers({
    login
})

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer
);
/* eslint-enable */

export default store;