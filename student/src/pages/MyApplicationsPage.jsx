// student/src/pages/MyApplicationsPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageContent.css';

function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        // Auth token is now sent automatically!
        const response = await axios.get('http://localhost:5001/api/students/applications');
setApplications(response.data.data.applications || []);        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch applications');
      }
      setLoading(false);
    };

    fetchApplications();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-header">My Applications</h1>
      
      {loading && <p>Loading applications...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Applied At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="4">You have not applied to any internships yet.</td>
                </tr>
              ) : (
                applications.map(app => (
                  <tr key={app._id}>
                    {/* Make sure your backend populates 'internship' and 'company' */}
                    <td>{app.internship?.title || 'N/A'}</td>
                    <td>{app.internship?.company?.name || 'N/A'}</td>
                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge status-${app.status}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyApplicationsPage;