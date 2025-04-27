import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://chatbackend.karthik.top/api",
    // baseURL : "http://localhost:5001/api",
    withCredentials : true //for sending cookies
});