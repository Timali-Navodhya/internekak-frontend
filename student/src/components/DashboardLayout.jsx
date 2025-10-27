// student/src/components/DashboardLayout.jsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './DashboardLayout.css'; // We re-use the same CSS

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      
      {/* --- TOP HEADER --- */}
      <header className="dashboard-header">
        <div className="header-left">
          <span className="header-logo">INTERNEKAK.IK</span>
          <a href="#">Services</a>
          <a href="#">Help</a>
        </div>
        <div className="header-right">
          <span className="header-icon">🔍</span> 
          <span className="header-icon">🔔</span>
          <span className="header-icon">💬</span>
          {/* Link to the student profile page */}
          <Link to="/profile" className="header-user">Student</Link>
          <Link to="/login" className="header-logout">Logout</Link>
        </div>
      </header>

      <div className="dashboard-body">
        
        {/* --- LEFT SIDEBAR (NEW STUDENT LINKS) --- */}
        <aside className="dashboard-sidebar">
          <h3>Navigation</h3>
          <ul>
            {/* Link to the main search page */}
            <li><Link to="/">Search Internships</Link></li>
            {/* Link to applications page */}
            <li><Link to="/applications">My Applications</Link></li>
            {/* Link to profile page */}
            <li><Link to="/profile">My Profile</Link></li>
          </ul>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="dashboard-content">
          {/* This Outlet renders our student pages */}
          <Outlet />
        </main>
      </div>

      {/* --- BOTTOM FOOTER --- */}
      <footer className="dashboard-footer">
        <a href="#">Contact site support</a>
        <p>You are logged in as a Student</p>
      </footer>

    </div>
  );
}

export default DashboardLayout;