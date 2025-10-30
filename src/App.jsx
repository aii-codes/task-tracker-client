import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    if (!token && isDashboard) {
      navigate("/");
    }
  }, [token, isDashboard, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-background-light text-gray-800"
      }`}
    >
      {/* HEADER */}
      <nav
        className={`w-full py-3 px-6 flex justify-between items-center shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-primary text-white"
        }`}
      >
        <h1 className="text-lg font-bold tracking-wide">Task Tracker by Aii</h1>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {token && isDashboard && (
            <button
              onClick={handleLogout}
              className={`px-3 py-1 rounded transition-all duration-300 ${
                darkMode
                  ? "bg-red-700 hover:bg-red-600"
                  : "bg-primary-dark hover:bg-primary-light"
              }`}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* PAGE CONTAINER */}
      <div className="flex-grow">
        {isDashboard ? (
          <div className="w-full">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-full py-12 px-6">
            <div
              className={`w-full max-w-md shadow-lg rounded-2xl p-8 transition-colors duration-300 ${
                darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
              }`}
            >
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;