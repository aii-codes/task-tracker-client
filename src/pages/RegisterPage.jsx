import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useTheme();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      setMessage("✅ Registered successfully! You can now log in.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed. Try again.");
    }
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-4 text-center transition-colors duration-300 ${
          darkMode ? "text-blue-300" : "text-primary-dark"
        }`}
      >
        Create Account
      </h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className={`w-full border rounded p-2 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={`w-full border rounded p-2 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <div className="relative">
          <input
            className={`w-full border rounded p-2 pr-10 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-primary hover:bg-primary-dark"
          }`}
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className={`font-medium ${
              darkMode ? "text-blue-400 hover:underline" : "text-primary hover:underline"
            }`}
          >
            Log in
          </Link>
        </p>
      </form>

      {message && (
        <p
          className={`mt-3 text-center transition-colors duration-300 ${
            message.startsWith("✅")
              ? darkMode
                ? "text-green-400"
                : "text-green-600"
              : darkMode
              ? "text-red-400"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default RegisterPage;