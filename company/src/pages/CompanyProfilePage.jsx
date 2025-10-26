// src/pages/CompanyProfilePage.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css'; // Re-using the same CSS

function CompanyProfilePage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    setApiError(null);
    console.log('Profile data:', data);

    try {
      // TODO: Get the token from where you saved it (e.g., localStorage)
      // const token = localStorage.getItem('token');
      // const config = {
      //   headers: { Authorization: `Bearer ${token}` }
      // };

      // Your backend 'updateProfile' endpoint uses these fields
      const response = await axios.put(
        'http://localhost:5000/api/company/profile', // Assuming this is your update endpoint
        {
          biography: data.biography,
          linkedinURL: data.linkedinURL,
          // 'registeredYear', 'mission', 'vision' are not in your backend controller.
          // We can add them later.
        }
        // config // Pass the auth header
      );

      console.log('Profile update success:', response.data);

      // After profile is complete, send to the dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error('Profile update failed:', err);
      if (err.response && err.response.data) {
        setApiError(err.response.data.message || 'Profile update failed.');
      } else {
        setApiError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Company Profile Creation</h2>
        
        {apiError && <div className="error-banner">{apiError}</div>}

        {/* You'll need to add a file upload component here */}
        <div className="profile-pic-placeholder">
          Profile
        </div>

        <div className="form-group">
          <label>Registered Year</label>
          <input type="number" {...register('registeredYear')} />
        </div>
        
        <div className="form-group">
          <label>Biography</label>
          <textarea {...register('biography')}></textarea>
        </div>

        <div className="form-group">
          <label>Mission</label>
          <textarea {...register('mission')}></textarea>
        </div>

        <div className="form-group">
          <label>Vision</label>
          <textarea {...register('vision')}></textarea>
        </div>

        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="url" {...register('linkedinURL')} />
        </div>

        <button type="submit" className="auth-button">Next</button>
      </form>
    </div>
  );
}

export default CompanyProfilePage;