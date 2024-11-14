import axios from "axios";
import { refreshAccesstoken } from "./api";
import useAuthStore from "@/store/useStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuthStore.getState();
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
    if (!originalRequest._retry) {
      originalRequest._retry = true;
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const { setToken } = useAuthStore.getState();

      try {
        const { accessToken } = await refreshAccesstoken();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        setToken(accessToken);
        return axiosInstance(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(new Error(error.response.data.message));
  }
);

export default axiosInstance;
