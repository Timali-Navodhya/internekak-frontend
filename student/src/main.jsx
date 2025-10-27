// student/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 1. Import
import ProtectedRoute from './components/ProtectedRoute'; // 2. Import

// Layout
import DashboardLayout from './components/DashboardLayout';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// App Pages
import InternshipSearchPage from './pages/InternshipSearchPage';
import InternshipDetailPage from './pages/InternshipDetailPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import MyProfilePage from './pages/MyProfilePage';

// Default CSS
import './index.css';

const router = createBrowserRouter([
  // Auth routes (no layout)
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // App routes (WITH layout)
  {
    path: '/',
    element: <ProtectedRoute />, // 3. Add ProtectedRoute
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <InternshipSearchPage /> },
          { path: 'internship/:id', element: <InternshipDetailPage /> },
          { path: 'applications', element: <MyApplicationsPage /> },
          { path: 'profile', element: <MyProfilePage /> },
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