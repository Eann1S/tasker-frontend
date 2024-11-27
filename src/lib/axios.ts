"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { refreshAccesstoken } from "./api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = cookies().get("accessToken")?.value;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    const notLoginRequest = !originalRequest.url.includes('/login');
    const notRetry = !originalRequest._retry;
    const unauthorizedStatus = error.response.status === 401;

    if (unauthorizedStatus && notRetry && notLoginRequest) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshAccesstoken();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (e: any) {
        console.error(e);
        return Promise.reject(new Error(error.message));
      }
    }
    console.error(error.response.data.message || error.message);
    return Promise.reject(
      new Error(error.response.data.message || error.message || "An error occured")
    );
  }
);

export default axiosInstance;
