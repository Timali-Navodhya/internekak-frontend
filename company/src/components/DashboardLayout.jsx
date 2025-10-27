// company/src/components/DashboardLayout.jsx

import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import
import './DashboardLayout.css';

function DashboardLayout() {
  const { logout } = useAuth(); // 2. Get logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="dashboard-layout">
      
      <header className="dashboard-header">
        <div className="header-left">
          <span className="header-logo">INTERNEKAK.IK</span>
          <a href="#">Services</a>
          <a href="#">Help</a>
        </div>
        <div className="header-right">
          <Link to="/notifications" className="header-icon">🔔</Link>
          <Link to="/messages" className="header-icon">💬</Link>
          <span className="header-user">IFS</span>

          {/* 3. Change Link to button with onClick */}
          <button onClick={handleLogout} className="header-logout">
            Logout
          </button>
        </div>
      </header>

      {/* ... (rest of the file is the same) ... */}
      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/post-vacancy">Post Vacancy</Link></li>
            <li><Link to="/allocations">Interview Allocations</Link></li>
            <li><Link to="/applications">Receive Applications</Link></li>
            <li><Link to="/interview">Interview</Link></li>
            <li><Link to="/reschedule">Interview Reschedule</Link></li>
            <li><Link to="/profile-edit">Profile Editing</Link></li>
          </ul>
        </aside>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
      <footer className="dashboard-footer">
        <Link to="/support">Contact site support</Link>
        <p>You are logged in as IFS</p>
      </footer>
    </div>
  );
}

export default DashboardLayout;