// company/src/components/ProtectedRoute.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // 1. Show a loading screen while we check the token
  if (loading) {
    return <div>Loading session...</div>;
  }

  // 2. If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. If authenticated, show the dashboard
  return <Outlet />;
}

export default ProtectedRoute;