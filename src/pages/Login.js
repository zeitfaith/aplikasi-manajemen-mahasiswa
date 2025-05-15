import React, { useContext } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = (credentials) => {
    login(credentials);
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;
