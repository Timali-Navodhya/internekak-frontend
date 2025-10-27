// student/src/pages/InternshipDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css'; // Re-using our styles
import './InternshipCard.css'; // Re-using card styles for the header

function InternshipDetailPage() {
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Gets the :id from the URL
  const navigate = useNavigate();

  // --- 1. Fetch Internship Details ---
  useEffect(() => {
    const fetchInternship = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/api/internships/${id}`);
        setInternship(response.data.data); // The object is at response.data.data
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch internship details');
      }
      setLoading(false);
    };

    fetchInternship();
  }, [id]);

  // --- 2. Handle Apply Button ---
  const handleApply = async () => {
    if (!window.confirm('Are you sure you want to apply for this position?')) {
      return;
    }

    try {
      // TODO: Get auth token and send it in headers
      // const token = localStorage.getItem('token');
      // const response = await axios.post(
      //   `http://localhost:5001/api/students/apply/${id}`, 
      //   {}, // Empty body, just need the token
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      
      // alert(response.data.message || 'Application successful!');
      
      // For testing:
      alert('Application Submitted! (This will be real when auth is added)');
      navigate('/applications'); // Go to "My Applications" page
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply. You may have already applied.');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading internship details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!internship) {
    return <div className="page-container"><p>Internship not found.</p></div>;
  }

  return (
    <div className="page-container">
      {/* --- Job Header --- */}
      <div className="internship-card job-detail-header">
        <h1 className="card-title">{internship.title}</h1>
        <h2 className="card-company">{internship.company?.name || 'Unknown Company'}</h2>
        <p className="card-location">{internship.location}</p>
        <div className="card-footer">
          <span className="card-type">{internship.type}</span>
          <button className="form-button" onClick={handleApply}>
            Apply Now
          </button>
        </div>
      </div>

      {/* --- Job Details --- */}
      <div className="job-detail-content">
        <h3>Job Description</h3>
        <p>{internship.description}</p>

        <h3>Requirements</h3>
        <p>{internship.requirements}</p>
        
        <h3>Salary</h3>
        <p>{internship.salary || 'Not Disclosed'}</p>
      </div>
    </div>
  );
}

export default InternshipDetailPage;