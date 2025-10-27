// admin/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 1. Import
import ProtectedRoute from './components/ProtectedRoute'; // 2. Import

// Layout
import DashboardLayout from './components/DashboardLayout';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // <-- 1. UN-COMMENT this

// App Pages
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import JobManagementPage from './pages/JobManagementPage';
import CategoryManagementPage from './pages/CategoryManagementPage';
import SubscriptionPage from './pages/SubscriptionPage';
import NotificationPage from './pages/NotificationPage';
import AdminProfilePage from './pages/AdminProfilePage';

// Default CSS
import './index.css';

const router = createBrowserRouter([
  // Auth routes (no layout)
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> }, // <-- 2. UN-COMMENT this

  // App routes (WITH layout)
  {
    path: '/',
    element: <ProtectedRoute />, // 3. Add ProtectedRoute
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'users', element: <UserManagementPage /> },
          { path: 'jobs', element: <JobManagementPage /> },
          { path: 'categories', element: <CategoryManagementPage /> },
          { path: 'subscriptions', element: <SubscriptionPage /> },
          { path: 'notifications', element: <NotificationPage /> },
          { path: 'profile', element: <AdminProfilePage /> },
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* 4. Wrap app */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);