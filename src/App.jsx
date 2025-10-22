import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background-light">
      <nav className="w-full bg-primary text-white py-3 px-6 flex justify-between shadow-md">
        <h1 className="text-lg font-bold tracking-wide">Task Tracker</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline hover:text-primary-light">Login</Link>
          <Link to="/register" className="hover:underline hover:text-primary-light">Register</Link>
          <Link to="/dashboard" className="hover:underline hover:text-primary-light">Dashboard</Link>
          <button
            onClick={handleLogout}
            className="bg-primary-dark px-3 py-1 rounded hover:bg-primary-light transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="w-full max-w-2xl bg-white shadow-lg mt-10 rounded-2xl p-8">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
