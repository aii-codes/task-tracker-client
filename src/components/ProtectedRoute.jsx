// client/src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

// ✅ Protects any route that requires authentication
export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        // 🚫 Redirect to login if no token
        return <Navigate to="/" replace />;
    }

    // ✅ Allow access if logged in
    return children;
}
