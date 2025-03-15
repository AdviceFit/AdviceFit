"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Create an Axios instance
const apiClient = axios.create({
  headers: {
    accept: "application/json",
    "Cache-Control": "no-cache",
  },
  withCredentials: true,
});

// Create an Axios interceptor for request
apiClient.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token?.value}`;
    }    

    if(config.responseType === "blob") {
      config.responseType = "arraybuffer";
    }
    
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
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Invalid token" &&
      error.response.config.responseType !== "blob"
    ) {
      return redirect("/sign-in");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
