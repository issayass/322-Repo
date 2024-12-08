import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor to attach the token if stored in cookies
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
