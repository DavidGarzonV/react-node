import configureStore from './configureStore';

var store: any = null;

export default function getStore() {
	if (store === null) {
		const result = configureStore();
		store = result.store;
	}
	return { store }
}
