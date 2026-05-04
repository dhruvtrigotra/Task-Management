import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-production-7015.up.railway.app",
});

// attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isAuthRoute = config.url?.startsWith("/auth");

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;