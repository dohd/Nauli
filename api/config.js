import axios from "axios";
import SyncStorage from 'sync-storage';

export const fetchAud = () => SyncStorage.get('aud');


// In Development mode set reverse proxy for localhost access 
//before starting local server i.e adb reverse tcp:8000 tcp:8000
const Api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    timeout: 15000,
    timeoutErrorMessage: 'timeout',
});

// Request interceptor
Api.interceptors.request.use(config => {
    const token = SyncStorage.get('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => Promise.reject(error));

// Response interceptor
Api.interceptors.response.use(response => {
    return response.data;
}, error => {
    if (error.response && error.response.data) 
        return Promise.reject(error.response.data);
    return Promise.reject(error);
});

export default Api;