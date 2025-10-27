// company/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- 1. IMPORT
import ProtectedRoute from './components/ProtectedRoute';

// --- Layout ---
import DashboardLayout from './components/DashboardLayout';

// --- Auth Pages ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyAccountPage from './pages/VerifyAccountPage';
import CompanyProfilePage from './pages/CompanyProfilePage';

// --- App Pages ---
import DashboardPage from './pages/DashboardPage';
import NotificationsPage from './pages/NotificationsPage';
import MessagePage from './pages/MessagePage';
import ContactSupportPage from './pages/ContactSupportPage';
import PostVacancyPage from './pages/PostVacancyPage';
import InterviewAllocationsPage from './pages/InterviewAllocationsPage';
import ReceiveApplicationsPage from './pages/ReceiveApplicationsPage';
import InterviewPage from './pages/InterviewPage';
import ReschedulePage from './pages/ReschedulePage';
import ProfileEditingPage from './pages/ProfileEditingPage';

// --- Default CSS ---
import './index.css';

const router = createBrowserRouter([
  // ... (all your existing routes)
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/register/profile', element: <CompanyProfilePage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/verify-account', element: <VerifyAccountPage /> },
  {
    path: '/',
    element: <ProtectedRoute />, // <-- THIS IS THE CHANGE
    children: [
      { 
        path: '/', 
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'dashboard', element: <DashboardPage /> }, // <-- No slashes
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'messages', element: <MessagePage /> },
          { path: 'support', element: <ContactSupportPage /> },
          { path: 'post-vacancy', element: <PostVacancyPage /> },
          { path: 'allocations', element: <InterviewAllocationsPage /> },
          { path: 'applications', element: <ReceiveApplicationsPage /> },
          { path: 'interview', element: <InterviewPage /> },
          { path: 'reschedule', element: <ReschedulePage /> },
          { path: 'profile-edit', element: <ProfileEditingPage /> },
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. WRAP YOUR APP */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);