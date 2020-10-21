

import { applyMiddleware, createStore, compose  } from 'redux';
import rootReducer from './reducers/reducers'
import createSagaMiddleware from  'redux-saga';

import rootSaga from './sagas/rootSaga';

export default function configureStore() {
	//Allow multiple enhancers
	const composeEnhancers = compose;
	//Apply saga middleware
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
	//Execute sagas
    sagaMiddleware.run(rootSaga);
    return {store}
}