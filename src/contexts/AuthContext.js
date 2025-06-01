import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Ambil user dari localStorage saat inisialisasi
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  // Simpan user ke localStorage setiap kali user berubah
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [user]);

  // Simulasi register
  const register = async (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    setIsAuthenticated(true);
  };

  // Simulasi login
  const login = async (credentials) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (
      storedUser &&
      storedUser.email === credentials.email &&
      storedUser.password === credentials.password
    ) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      alert('Email atau password salah!');
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,           // Penting untuk fitur edit profil
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
