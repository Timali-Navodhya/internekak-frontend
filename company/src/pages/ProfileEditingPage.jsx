// src/pages/ProfileEditingPage.jsx

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css'; // Re-use the same CSS

// Mock function to simulate fetching current profile data
const fetchProfileData = async () => {
  // TODO: In a real app, you would fetch this from your backend
  // const token = localStorage.getItem('token');
  // const { data } = await axios.get('http://localhost:5000/api/company/profile', {
  //   headers: { Authorization: `Bearer ${token}` }
  // });
  // return data.company;

  // For now, return mock data
  return {
    name: 'IFS',
    email: 'ifs@example.com', // Email is usually not editable
    address: '123 Main St, Colombo',
    telephone: '0112345678',
    linkedinURL: 'https://linkedin.com/company/ifs',
    biography: 'IFS develops and delivers enterprise software for customers around the world.'
  };
};

function ProfileEditingPage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. Load existing data when page opens ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProfileData();
        reset(data); // Pre-fill the form with loaded data
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load profile", err);
        alert("Could not load your profile data.");
      }
    };
    loadData();
  }, [reset]); // 'reset' is a dependency

  // --- 2. Handle form submission ---
  const onSubmit = async (data) => {
    console.log('Updated Profile Data:', data);
    
    // TODO: Connect to your 'updateProfile' backend endpoint
    // try {
    //   const token = localStorage.getItem('token');
    //   await axios.put('http://localhost:5000/api/company/profile', data, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   alert('Profile updated successfully!');
    //   navigate('/dashboard');
    // } catch (err) {
    //   alert('Failed to update profile.');
    // }
    
    alert('Profile updated! Check console.');
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

export default ProfileEditingPage;