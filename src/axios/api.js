import API_URL from '../utils/API_URL';
import axios from 'axios';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        // Get the token from local storage or wherever you have stored it
        // const token = localStorage.getItem('accessToken');

        // // If a token exists, add it to the Authorization header
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    });

export default api;
