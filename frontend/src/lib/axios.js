import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fullstack-chat-app-production-1228.up.railway.app/api",
  // baseURL: "http://localhost:5001/api",
  withCredentials: false, // not needed anymore
});

// OPTIONAL: Auto-attach userId if available
axiosInstance.interceptors.request.use((config) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  if (authUser?._id) {
    config.headers["user-id"] = authUser._id;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
