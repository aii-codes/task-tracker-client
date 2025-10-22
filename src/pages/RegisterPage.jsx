import { useState } from "react";
import api from "../services/api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full border rounded p-2"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border rounded p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-all duration-300"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}

export default RegisterPage;
