import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://task-tracker-backend-8yob.onrender.com/api",
});

export default api;
