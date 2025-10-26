// src/components/DashboardLayout.jsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

// We'll create this CSS file next
import './DashboardLayout.css'; 

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      
      {/* --- TOP HEADER --- */}
      {/* --- TOP HEADER --- */}
<header className="dashboard-header">
  <div className="header-left">
    <span className="header-logo">INTERNEKAK.IK</span>
    <a href="#">Services</a>
    <a href="#">Help</a>
  </div>
  <div className="header-right">
    {/* Icons are now links */}
    <span className="header-icon">🔍</span> {/* Search icon - no link for now */}
    <Link to="/notifications" className="header-icon">🔔</Link>
    <Link to="/messages" className="header-icon">💬</Link>
    
    <span className="header-user">IFS</span>
    <Link to="/login" className="header-logout">Logout</Link>
  </div>
</header>

      <div className="dashboard-body">
        
        {/* --- LEFT SIDEBAR --- */}
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

        {/* --- MAIN CONTENT AREA --- */}
        <main className="dashboard-content">
          {/* This Outlet is where your pages (DashboardPage, etc.) will be rendered */}
          <Outlet />
        </main>
      </div>

      {/* --- BOTTOM FOOTER --- */}
      <footer className="dashboard-footer">
        <Link to="/support">Contact site support</Link>
        <p>You are logged in as IFS</p>
      </footer>

    </div>
  );
}

export default DashboardLayout;