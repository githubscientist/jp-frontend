import axios from "axios";

const API_BASE_URL = 'http://localhost:3001/api';

// create an axios instance with the base URL
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for http-only cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// request interceptor to add auth token if available
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // handle common error cases
        if (error.response?.status === 401) {
            // token expired or unauthorized - let React Router handle this
            console.log('Unauthorized request:', error.config?.url);
        }
        return Promise.reject(error);
    }
);

export default api;