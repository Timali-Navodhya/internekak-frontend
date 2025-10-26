import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// --- Our New Layout ---
import DashboardLayout from './components/DashboardLayout';

// --- Auth Pages ---
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyAccountPage from './pages/VerifyAccountPage';
import CompanyProfilePage from './pages/CompanyProfilePage';

// --- App Pages (will be rendered inside the layout) ---
import DashboardPage from './pages/DashboardPage'; // CORRECTED
import NotificationsPage from './pages/NotificationsPage';
import MessagePage from './pages/MessagePage';
import ContactSupportPage from './pages/ContactSupportPage'; // CORRECTED
import PostVacancyPage from './pages/PostVacancyPage';
import InterviewAllocationsPage from './pages/InterviewAllocationsPage';
import ReceiveApplicationsPage from './pages/ReceiveApplicationsPage';
import InterviewPage from './pages/InterviewPage'; // CORRECTED
import ReschedulePage from './pages/ReschedulePage';
import ProfileEditingPage from './pages/ProfileEditingPage';

// --- Default CSS ---
import './index.css';

const router = createBrowserRouter([
  // Auth Routes (they do NOT use the layout)
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/register/profile', element: <CompanyProfilePage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/verify-account', element: <VerifyAccountPage /> },
  
  // App Routes (ALL of these will be rendered inside the DashboardLayout)
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <DashboardPage /> }, // Home page
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/messages', element: <MessagePage /> },
      { path: '/support', element: <ContactSupportPage /> },
      { path: '/post-vacancy', element: <PostVacancyPage /> },
      { path: '/allocations', element: <InterviewAllocationsPage /> },
      { path: '/applications', element: <ReceiveApplicationsPage /> },
      { path: '/interview', element: <InterviewPage /> },
      { path: '/reschedule', element: <ReschedulePage /> },
      { path: '/profile-edit', element: <ProfileEditingPage /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);