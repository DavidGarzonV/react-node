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
                data = { statusCode: error.response.status };
            });
        } else if (method === "post") {
            await axios.post(URL + path, bodyRequest, axiosConfig).then((result => data = result)).catch((error) => {
                data = { statusCode: error.response.status };
            });
        } else if (method === "put") {
            await axios.put(URL + path, bodyRequest, axiosConfig).then((result => data = result)).catch((error) => {
                data = { statusCode: error.response.status };
            });
        } else {
            await axios.delete(URL + path, axiosConfig
            ).then((result => data = result)).catch((error) => {
                data = { statusCode: error.response.status };
            });
        }
    } catch (error) {
        return false;
    }

    //Unauthorized
    if (data.statusCode === 401) {
        window.location.href = '/login';
    }

    return data;
}

export const validateSession = async () => {
    let response = await request('/auth/verify', 'post');
    if (response.statusCode !== 401) {
        if (response.data.status) {
            return { status: true };
        }
    }
    return { status: false }
}