// src/pages/ReschedulePage.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css'; // Re-use the same CSS

function ReschedulePage() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      companyName: 'IFS', // This should come from user context
    }
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Interview Reschedule Data:', data);
    
    // TODO: Connect to your backend endpoint for rescheduling
    // try {
    //   await axios.post('http://localhost:5000/api/company/interview/reschedule', data);
    //   alert('Reschedule request saved!');
    // } catch (err) {
    //   alert('Failed to save.');
    // }
    
    alert('Reschedule request submitted! Check console.');
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Interview Reschedule</h1>
      
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            type="text"
            {...register('companyName')}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="allocatedDates">Allocated Dates</label>
          <input
            id="allocatedDates"
            type="text"
            placeholder="e.g., November 1, 2025"
            {...register('allocatedDates', { required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="allocatedTimes">Allocated Times</label>
          <input
            id="allocatedTimes"
            type="text"
            placeholder="e.g., 2:00 PM - 3:00 PM"
            {...register('allocatedTimes', { required: true })}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Save</button>
          <button 
            type="button" 
            className="form-button secondary"
            onClick={() => navigate('/dashboard')}
          >
            Back
          </button>
        </div>

      </form>
    </div>
  );
}

export default ReschedulePage;