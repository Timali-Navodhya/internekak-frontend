// src/pages/InterviewAllocationsPage.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css'; // Re-use the same CSS

function InterviewAllocationsPage() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      companyName: 'IFS', // This should come from user context
    }
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Interview Allocation Data:', data);
    
    // TODO: Connect to your backend endpoint for setting allocations
    // try {
    //   await axios.post('http://localhost:5000/api/company/interview/allocate', data);
    //   alert('Allocations saved!');
    //   reset();
    // } catch (err) {
    //   alert('Failed to save allocations.');
    // }
    
    alert('Allocations submitted! Check console.');
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Interview Allocations</h1>
      
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            type="text"
            {...register('companyName')}
            readOnly // Company name should not be editable here
          />
        </div>

        <div className="form-group">
          <label htmlFor="allocatedDates">Allocated Dates</label>
          <input
            id="allocatedDates"
            type="text" // Or type="date"
            placeholder="e.g., October 30, 2025"
            {...register('allocatedDates', { required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="allocatedTimes">Allocated Times</label>
          <input
            id="allocatedTimes"
            type="text" // Or type="time"
            placeholder="e.g., 9:00 AM - 11:00 AM"
            {...register('allocatedTimes', { required: true })}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Save</button>
          <button 
            type="button" 
            className="form-button secondary"
            onClick={() => navigate('/dashboard')} // Go back to dashboard
          >
            Back
          </button>
        </div>

      </form>
    </div>
  );
}

export default InterviewAllocationsPage;