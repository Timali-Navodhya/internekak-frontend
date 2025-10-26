// src/pages/InterviewPage.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css'; // Re-use the same CSS

function InterviewPage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Interview Link Data:', data);
    
    // TODO: Connect to your backend endpoint for saving the interview link
    // This might be part of an 'Application' model
    // try {
    //   await axios.post('http://localhost:5000/api/company/interview/link', data);
    //   alert('Link saved!');
    //   reset();
    // } catch (err) {
    //   alert('Failed to save link.');
    // }
    
    alert('Link submitted! Check console.');
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Interview</h1>
      
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="interviewLink">Upload Link</label>
          <textarea
            id="interviewLink"
            placeholder="Paste your meeting link here (e.g., Zoom, Google Meet)..."
            {...register('interviewLink', { required: true })}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Save</button>
          <button 
            type="button" 
            className="form-button secondary"
            onClick={() => navigate('/dashboard')} // Go back
          >
            Back
          </button>
        </div>

      </form>
    </div>
  );
}

export default InterviewPage;