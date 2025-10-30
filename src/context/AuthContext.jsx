import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔑 Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // you can decode or fetch user info if needed
    }
  }, []);

  // 🔒 Login handler — store token
  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  // 🚪 Logout handler — remove token
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🧠 Context value for other components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🪄 Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
