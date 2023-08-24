import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
    timeout: 15000,
    timeoutErrorMessage: 'timeout'
});

// Request interceptor
Api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, err => Promise.reject(err));

// Response interceptor
// instance.interceptors.response.use(response => {
//     return response.data;
// }, err => {
//     const errorData = err.response?.data; //optional chaining
//     return errorData ? errorHandler(errorData) : Promise.reject(err);
// });

export default Api;