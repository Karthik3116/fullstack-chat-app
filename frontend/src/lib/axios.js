import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://fullstack-chat-app-production-1228.up.railway.app/api",
    // baseURL : "http://localhost:5001/api",
    withCredentials : true //for sending cookies
});