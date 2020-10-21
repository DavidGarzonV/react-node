import { combineReducers } from 'redux';
import login from './login';
import validateLogin from './validateLogin';

const rootReducer = combineReducers({
    login,
    validateLogin
})

export default rootReducer;