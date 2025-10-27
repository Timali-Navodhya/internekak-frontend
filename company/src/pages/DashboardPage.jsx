// company/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Link } from 'react-router-dom';
import './PageContent.css'; // Re-using styles

function DashboardPage() {
  const [companyData, setCompanyData] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Get logged-in user info

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch profile (we might already have this in 'user' from useAuth)
        // If 'user' is populated, we can skip this call or use it to refresh
        const profileResponse = await axios.get('http://localhost:5001/api/companies/profile');
        setCompanyData(profileResponse.data.data.company);

        // Fetch vacancies for this company
        const vacanciesResponse = await axios.get('http://localhost:5001/api/companies/vacancies');
        setVacancies(vacanciesResponse.data.data.vacancies || []);

        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        console.error("Dashboard fetch error:", err);
      }
      setLoading(false);
    };

    // Only fetch if logged in (token should be set by AuthContext)
    if (user || localStorage.getItem('token')) {
        fetchDashboardData();
    } else {
        // This case shouldn't happen due to ProtectedRoute, but good practice
        setError("Not authenticated");
        setLoading(false);
    }

  }, [user]); // Re-fetch if user object changes

  return (
    <div className="page-container">
      <h1 className="page-header">Company Dashboard</h1>

      {loading && <p>Loading dashboard data...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && companyData && (
        <div className="analytics-grid"> {/* Re-use admin grid style */}

          <div className="analytics-card">
            <h2>Welcome, {companyData.name}!</h2>
            <p><strong>Email:</strong> {companyData.email}</p>
            <p><strong>Address:</strong> {companyData.address}</p>
            <Link to="/profile-edit" className="form-button small secondary">Edit Profile</Link>
          </div>

          <div className="analytics-card">
            <h2>Your Vacancies</h2>
            <p><strong>Total Posted:</strong> {vacancies.length}</p>
            <p><strong>Active:</strong> {vacancies.filter(v => v.status === 'active').length}</p>
            <Link to="/post-vacancy" className="form-button small">Post New Vacancy</Link>
            {/* TODO: Add link to view all vacancies */}
          </div>

          {/* Placeholder for application stats */}
          <div className="analytics-card">
            <h2>Recent Applications</h2>
            <p>Application data not yet available.</p>
            {/* TODO: Fetch and display recent application count/list */}
             <Link to="/applications" className="form-button small secondary">View Applications</Link>
          </div>

        </div>
      )}
    </div>
  );
}

export default DashboardPage;