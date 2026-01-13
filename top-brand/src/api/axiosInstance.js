import axios from "axios";
import { refreshAccessToken } from "../utils/authHelper";
import { BASE_URL } from "../api/api";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // needed for refreshToken cookie
});

// Automatically attach the access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept 401 errors and try to refresh access token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Protect against missing response (network errors)
    if (!error.response) return Promise.reject(error);

    // Only retry once for 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
