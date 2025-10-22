import axios from "axios";

const api = axios.create({
  baseURL: "https://task-tracker-backend.onrender.com/api",
});

export default api;
