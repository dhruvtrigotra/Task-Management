import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
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