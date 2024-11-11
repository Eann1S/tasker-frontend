import axios from "axios";
import { refresh_token } from "./api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call failed:", error);
    return Promise.reject(new Error(error.response.data.message));
  }
);

export default axiosInstance;
