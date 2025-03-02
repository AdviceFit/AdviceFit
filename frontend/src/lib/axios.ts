// axiosInstance.js
import { BASE_URL } from '@/constants/constant';
import axios from 'axios';
import { NextResponse } from 'next/server';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Create an Axios interceptor for request
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create an Axios interceptor for response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401 && error.response.data.message === 'Unauthorized') {
      return NextResponse.redirect('/sign-in');
    }

    return Promise.reject(error);
  }
);

export default api;
