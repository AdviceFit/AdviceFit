import axios from 'axios';
import { NextResponse } from 'next/server';

// Create an Axios instance
const apiClient = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
  withCredentials: true
});

// Create an Axios interceptor for request
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create an Axios interceptor for response
apiClient.interceptors.response.use(
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

export default apiClient;
