// company/src/pages/ReschedulePage.jsx

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // To get company name
import './PageContent.css'; 

function ReschedulePage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current company info
  const [loading, setLoading] = useState(true);
  const [originalAllocations, setOriginalAllocations] = useState(null);
  const [error, setError] = useState(null);

  // --- 1. Fetch original allocations for context ---
  useEffect(() => {
    const fetchOriginalAllocations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/companies/profile');
            setOriginalAllocations(response.data.data.company.interviewAllocations);
        } catch (err) {
            console.error("Failed to fetch original allocations", err);
            setError("Could not load original schedule for reference.");
        }
        setLoading(false);
    };
    fetchOriginalAllocations();
  }, []);

  // --- 2. Handle form submission ---
  const onSubmit = async (data) => {
    setError(null);
    if (!originalAllocations) {
        alert("Cannot submit: Could not retrieve original schedule.");
        return;
    }
    
    // Prepare data for API
    const submissionData = {
        originalDates: originalAllocations.dates,
        originalTimes: originalAllocations.times,
        newDates: data.newDates,
        newTimes: data.newTimes,
        reason: data.reason
    };

    try {
      await axios.post('http://localhost:5001/api/companies/reschedule', submissionData);
      alert('Reschedule request successfully submitted! We will notify you once reviewed.');
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit reschedule request.');
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;
  
  return (
    <div className="page-container">
      <h1 className="page-header">Interview Reschedule Request</h1>
      
      {error && <p className="error-message">{error}</p>}
      
      {/* Display Original Schedule for Context */}
      <div className="analytics-card" style={{ marginBottom: '20px' }}>
          <h2>Current General Schedule (For Reference)</h2>
          <p><strong>Dates:</strong> {originalAllocations?.dates || 'Not Set'}</p>
          <p><strong>Times:</strong> {originalAllocations?.times || 'Not Set'}</p>
          <p>Please propose a new time below.</p>
      </div>

      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="newDates">Proposed New Dates*</label>
          <input
            id="newDates"
            type="text"
            placeholder="e.g., Nov 20 - Nov 22, 2025"
            {...register('newDates', { required: 'Proposed date(s) are required' })}
          />
          {errors.newDates && <p className="error-message">{errors.newDates.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="newTimes">Proposed New Times*</label>
          <input
            id="newTimes"
            type="text"
            placeholder="e.g., 1:00 PM - 3:00 PM"
            {...register('newTimes', { required: 'Proposed time(s) are required' })}
          />
          {errors.newTimes && <p className="error-message">{errors.newTimes.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="reason">Reason for Reschedule (Optional)</label>
          <textarea
            id="reason"
            placeholder="Briefly explain why you need to reschedule."
            {...register('reason')}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Submit Reschedule Request</button>
          <button 
            type="button" 
            className="form-button secondary"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default ReschedulePage;