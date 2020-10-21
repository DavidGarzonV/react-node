import { takeLatest } from "redux-saga/effects";
import validateLogin from "./auth";
import { validatingType } from '../actions/validateLogin';

export default function* rootSaga(){
	//Whatcher for action, and do function
	yield takeLatest(validatingType, validateLogin);
}