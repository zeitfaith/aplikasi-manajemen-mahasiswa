// src/pages/Login.js
import React, { useContext } from "react";
import LoginForm from "../components/Auth/LoginForm";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleLogin = async (credentials) => {
    await login(credentials);
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
