import React, { createContext, useState, useEffect, useContext } from "react"; // Added useContext
import apiClient from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const { data } = await apiClient.get("/users/me");
          setUser(data.user);
        } catch (error) {
          console.error("Auth Error:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// --- ADD THIS LINE AT THE BOTTOM ---
export const useAuth = () => useContext(AuthContext); 

export default AuthContext;