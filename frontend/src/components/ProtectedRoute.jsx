import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyberCyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    // If not logged in, boot them to the login screen
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected component (like Dashboard)
  return children;
};

export default ProtectedRoute;
