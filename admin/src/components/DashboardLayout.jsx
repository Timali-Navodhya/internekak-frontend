// admin/src/components/DashboardLayout.jsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './DashboardLayout.css'; // We re-use the same CSS

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      
      {/* --- TOP HEADER --- */}
      <header className="dashboard-header">
        <div className="header-left">
          <span className="header-logo">INTERNEKAK.IK (Admin)</span>
          <a href="#">Services</a>
          <a href="#">Help</a>
        </div>
        <div className="header-right">
          <span className="header-icon">🔍</span> 
          {/* Link to the admin notifications page */}
          <Link to="/notifications" className="header-icon">🔔</Link>
          <span className="header-icon">💬</span>
          <span className="header-user">Admin</span>
          <Link to="/login" className="header-logout">Logout</Link>
        </div>
      </header>

      <div className="dashboard-body">
        
        {/* --- LEFT SIDEBAR (NEW ADMIN LINKS) --- */}
        <aside className="dashboard-sidebar">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/dashboard">Dashboard (Analytics)</Link></li>
            <li><Link to="/users">User Management</Link></li>
            <li><Link to="/jobs">Job Management</Link></li>
            <li><Link to="/categories">Category Management</Link></li>
            <li><Link to="/subscriptions">Subscriptions</Link></li>
            <li><Link to="/notifications">Notifications</Link></li>
            <li><Link to="/profile">Admin Profile</Link></li>
          </ul>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="dashboard-content">
          {/* This Outlet renders our admin pages */}
          <Outlet />
        </main>
      </div>

      {/* --- BOTTOM FOOTER --- */}
      <footer className="dashboard-footer">
        <a href="#">Contact site support</a>
        <p>You are logged in as Admin</p>
      </footer>

    </div>
  );
}

export default DashboardLayout;