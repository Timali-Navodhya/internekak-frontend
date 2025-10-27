// student/src/pages/InternshipSearchPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css'; // Re-using our styles
import './InternshipCard.css'; // We will create this new CSS file

function InternshipSearchPage() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      try {
        // Fetch all internships from the public endpoint
        const response = await axios.get('http://localhost:5001/api/internships');
setInternships(response.data.data.internships || []);        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch internships');
      }
      setLoading(false);
    };

    fetchInternships();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-header">Search Internships</h1>
      
      {/* --- Search Bar --- */}
      <div className="search-bar-container">
        <input type="text" placeholder="Search by title, company, or keyword..." />
        <button className="form-button">Search</button>
      </div>

      {/* --- Internship List --- */}
      <div className="internship-list">
        {loading && <p>Loading internships...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {!loading && !error && internships.length === 0 && (
          <p>No internships found.</p>
        )}
        
        {!loading && !error && internships.map(job => (
          <div key={job._id} className="internship-card">
            <h2 className="card-title">{job.title}</h2>
            <h3 className="card-company">{job.company?.name || 'Unknown Company'}</h3>
            <p className="card-location">{job.location}</p>
            <p className="card-description">{job.description.substring(0, 150)}...</p>
            <div className="card-footer">
              <span className="card-type">{job.type}</span>
              {/* Link to the detail page */}
              <Link to={`/internship/${job._id}`} className="form-button small">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternshipSearchPage;