import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, //for sending cookies
});

console.log("API baseURL:", import.meta.env.VITE_API_BASE_URL);

export default api;
