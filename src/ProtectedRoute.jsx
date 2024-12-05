import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir a la página de administrador
    return <Navigate to="/Administrador" />;
  }

  return children;
};

export default ProtectedRoute;