import { combineReducers } from 'redux';
import loading from './loading';
import validateLogin from './validateLogin';

const rootReducer = combineReducers({
    loading,
    validateLogin
})

export default rootReducer;