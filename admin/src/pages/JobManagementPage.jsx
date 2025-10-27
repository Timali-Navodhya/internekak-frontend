// admin/src/pages/JobManagementPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageContent.css'; // Re-using our styles

function JobManagementPage() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Fetch All Job Posts ---
  const fetchJobs = async () => {
    try {
      setLoading(true);
      // TODO: Add auth token
      const response = await axios.get('http://localhost:5001/api/admin/jobs');
      setVacancies(response.data.data.vacancies || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // --- 2. Handle Job Status Update ---
  const handleUpdateStatus = async (companyId, vacancyId, newStatus) => {
    try {
      // TODO: Add auth token
      await axios.put(
        `http://localhost:5001/api/admin/jobs/${companyId}/${vacancyId}/status`,
        { status: newStatus }
      );
      alert(`Job status updated to ${newStatus}`);
      fetchJobs(); // Refresh the list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Job Post Management</h1>
      
      {loading && <p>Loading jobs...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map(job => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.company.name}</td>
                  <td>
                    <span className={`status-badge status-${job.status}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="table-actions">
                    {job.status !== 'active' && (
                      <button 
                        className="form-button small"
                        onClick={() => handleUpdateStatus(job.company._id, job._id, 'active')}
                      >
                        Approve
                      </button>
                    )}
                    {job.status !== 'inactive' && (
                      <button 
                        className="form-button small secondary"
                        onClick={() => handleUpdateStatus(job.company._id, job._id, 'inactive')}
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default JobManagementPage;