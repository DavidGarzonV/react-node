
import { createStore, combineReducers } from 'redux';
import login from './reducers/login';

const reducer = combineReducers({
    login
})

const store = createStore(reducer);

export default store;