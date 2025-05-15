import React, { useContext } from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Register = () => {
  const { isAuthenticated, register } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleRegister = async (data) => {
    await register(data);
    navigate('/login'); 
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default Register;
