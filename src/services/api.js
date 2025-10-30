import axios from "axios";

// 🧠 Detect if running locally (supports localhost and 127.0.0.1)
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// 🚀 Smart API base URL detection
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    (isLocal
      ? "http://localhost:5000/api" // ✅ Local backend
      : "https://task-tracker-backend-8yob.onrender.com/api"), // ✅ Deployed backend
});

export default api;
