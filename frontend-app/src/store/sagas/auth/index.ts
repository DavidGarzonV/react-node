import { validateSession } from './../../../functions/index';
import { validateSuccessType, validateFailedType } from './../../actions/validateLogin';
import { call, put } from "redux-saga/effects";

export default function* validateLogin(){
	try {
		//consume API
		//yield, await promise
		const response = yield validateSession();

		//dispatch success action
		yield put({type: validateSuccessType, payload: response.status});
	} catch (error) {
		//if error dispatch failed action
		yield put({type: validateFailedType});
	}
}