// company/src/pages/ProfileEditingPage.jsx

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css';

function ProfileEditingPage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. Load existing data when page opens ---
  useEffect(() => {
    const loadData = async () => {
      try {
        // Auth token sent automatically
        const { data } = await axios.get('http://localhost:5001/api/companies/profile');
        reset(data.data.company); // Pre-fill the form
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load profile", err);
        alert("Could not load your profile data.");
      }
    };
    loadData();
  }, [reset]);

  // --- 2. Handle form submission ---
  const onSubmit = async (data) => {
    try {
      // Auth token sent automatically
      await axios.put('http://localhost:5001/api/companies/profile', data);
      alert('Profile updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <h1 className="page-header">Profile Editing</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Profile Editing</h1>
      
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input id="name" type="text" {...register('name', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} readOnly />
          <small>Email address cannot be changed.</small>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input id="address" type="text" {...register('address', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Telephone</label>
          <input id="telephone" type="tel" {...register('telephone', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="linkedinURL">LinkedIn URL</label>
          <input id="linkedinURL" type="url" {...register('linkedinURL')} />
        </div>
        <div className="form-group">
          <label htmlFor="biography">Biography</label>
          <textarea id="biography" {...register('biography')} />
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button">Save Changes</button>
          <button type="button" className="form-button secondary" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditingPage;