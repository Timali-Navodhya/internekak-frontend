// admin/src/pages/AdminProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // To get current user info if needed
import './PageContent.css'; 

function AdminProfilePage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // Get logged-in admin details

  // --- 1. Load existing profile data ---
  useEffect(() => {
    // We already have user data in AuthContext after login, 
    // but a dedicated GET endpoint is better for refreshing.
    // Let's assume the user object in context is up-to-date for now.
    if (user) {
        reset(user); // Pre-fill form with context data
        setIsLoading(false);
    } else {
        // Optional: Fetch profile if user context is empty (e.g., page refresh)
        const fetchAdminProfile = async () => {
             try {
                const { data } = await axios.get('http://localhost:5001/api/admin/profile');
                reset(data.data.admin);
                setIsLoading(false);
             } catch(err) {
                 console.error("Failed to fetch admin profile", err);
                 alert("Could not load profile.");
                 setIsLoading(false);
             }
        };
        fetchAdminProfile();
    }
  }, [user, reset]);

  // --- 2. Handle form submission ---
  const onSubmit = async (data) => {
    // Only send fields that can be updated (e.g., name, maybe password later)
    const updateData = {
        name: data.name
        // Add password fields here if implementing password change
    };

    try {
      // Auth token sent automatically
      await axios.put('http://localhost:5001/api/admin/profile', updateData);
      alert('Profile updated successfully!');
      // Optional: Refresh user data in AuthContext here
      navigate('/dashboard'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <h1 className="page-header">Admin Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Admin Profile</h1>
      
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="name">Full Name*</label>
          <input 
            id="name" 
            type="text" 
            {...register('name', { required: 'Name is required' })} 
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} readOnly />
          <small>Email address cannot be changed.</small>
        </div>

        {/* Add fields for password change here if needed */}

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

export default AdminProfilePage;