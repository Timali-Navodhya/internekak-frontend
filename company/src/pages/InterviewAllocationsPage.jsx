// company/src/pages/InterviewAllocationsPage.jsx

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css'; // Re-using styles

function InterviewAllocationsPage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  // Fetch existing allocations to pre-fill form
  useEffect(() => {
    const fetchAllocations = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        // Fetch the full company profile which includes allocations
        const response = await axios.get('http://localhost:5001/api/companies/profile');
        if (response.data.data.company.interviewAllocations) {
          reset({ // Pre-fill fields if they exist
            allocatedDates: response.data.data.company.interviewAllocations.dates,
            allocatedTimes: response.data.data.company.interviewAllocations.times,
            instructions: response.data.data.company.interviewAllocations.instructions, // Added instructions
          });
        }
      } catch (err) {
        console.error("Failed to fetch existing allocations", err);
        setError("Could not load current allocation data. Please check your connection.");
        // Don't block loading if fetching fails, just show empty form with error
      }
      setLoading(false);
    };
    fetchAllocations();
  }, [reset]); // Dependency array includes reset

  // Handle form submission to update allocations
  const onSubmit = async (data) => {
    console.log('Updating Interview Allocation Data:', data);
    setError(null); // Clear previous errors
    try {
      // Auth token sent automatically via AuthContext/axios defaults
      await axios.put('http://localhost:5001/api/companies/allocations', {
          allocatedDates: data.allocatedDates,
          allocatedTimes: data.allocatedTimes,
          instructions: data.instructions, // Send instructions field
      });
      alert('Allocations saved successfully!');
      // Optionally navigate away or stay on the page
      // navigate('/dashboard');
    } catch (err) {
      console.error("Failed to save allocations", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to save allocations. Please try again.');
    }
  };

  // Display loading state
  if (loading) {
     return (
       <div className="page-container">
         <h1 className="page-header">Interview Allocations</h1>
         <p>Loading current settings...</p>
       </div>
     );
  }

  // Main component render
  return (
    <div className="page-container">
      <h1 className="page-header">Interview Allocations</h1>
      <p>Set the general dates, times, and instructions for interviews you conduct.</p>

      {/* Display error messages */}
      {error && <p className="error-message" style={{ backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</p>}

      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
          <label htmlFor="allocatedDates">Available Dates</label>
          <input
            id="allocatedDates"
            type="text"
            placeholder="e.g., Nov 10 - Nov 14, 2025"
            {...register('allocatedDates')} // Can be optional
          />
           <small>Enter the date range(s) you are generally available (e.g., "Mondays & Wednesdays", "Dec 1st - Dec 5th").</small>
        </div>

        <div className="form-group">
          <label htmlFor="allocatedTimes">Available Times</label>
          <input
            id="allocatedTimes"
            type="text"
            placeholder="e.g., 9:00 AM - 12:00 PM, 2:00 PM - 4:00 PM"
            {...register('allocatedTimes')} // Can be optional
          />
          <small>Enter the time slots you are generally available (e.g., "10am-11am", "2pm-4pm EST").</small>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions (Optional)</label>
          <input
            id="instructions"
            type="text"
            placeholder="e.g., Online via Google Meet, link will be sent"
            {...register('instructions')}
          />
          <small>Provide general instructions for candidates regarding interviews.</small>
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Save Allocations</button>
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