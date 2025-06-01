// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cek login status di localStorage saat mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fungsi register
  const register = async (data) => {
    const res = await fetch("http://localhost:6543/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Gagal registrasi");
    }
  };

  // Fungsi login
  const login = async (credentials) => {
    const res = await fetch("http://localhost:6543/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Gagal login");
    }
    const data = await res.json();
    setUser(data.data);
    localStorage.setItem("user", JSON.stringify(data.data));
  };

  // Fungsi logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
