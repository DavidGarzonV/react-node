import { URL } from '../constants/index';
import axios from 'axios';

export const request = async (path: string, method: string, bodyRequest = {}) => {
	let token = localStorage.getItem('token')

	const axiosConfig = {
		headers: {
			"auth": token
		}
	};

	try {
		var data: any;
		if (method === "get") {
			await axios.get(URL + path, axiosConfig).then((result => data = result)).catch((error) => {
				data = { status: false, statusCode: error.response.status };
			});
		} else if (method === "post") {
			await axios.post(URL + path, bodyRequest, axiosConfig).then((result => data = result)).catch((error) => {
				data = { status: false, statusCode: error.response.status };
			});
		} else if (method === "put") {
			await axios.put(URL + path, bodyRequest, axiosConfig).then((result => data = result)).catch((error) => {
				data = { status: false, statusCode: error.response.status };
			});
		} else {
			await axios.delete(URL + path, axiosConfig
			).then((result => data = result)).catch((error) => {
				data = { status: false, statusCode: error.response.status };
			});
		}
	} catch (error) {
		return { status: false };
	}

	//Unauthorized
	if (data.statusCode === 401) {
		return { status: false, statusCode: 401 };
	}

	return data;
}

export const validateSession = async () => {

	let token = localStorage.getItem('token')
	if (token === null || token === undefined) {
		return { status: false, statusCode: 401 }
	}

	let response = await request('/auth/verify', 'post');
	if (response.statusCode !== 401) {
		if (response.data.status) {
			return { status: true };
		}
	}
	return { status: false, statusCode: 401 }
}