// src/pages/PostVacancyPage.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './PageContent.css'; // Re-use the same CSS

function PostVacancyPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log('New Vacancy Data:', data);

    // TODO: Connect to your backend
    // try {
    //   // TODO: Get auth token
    //   // const token = localStorage.getItem('token');
    //   // const config = {
    //   //   headers: { Authorization: `Bearer ${token}` }
    //   // };
    //
    //   const response = await axios.post(
    //     'http://localhost:5000/api/company/vacancy', // Your postVacancy endpoint
    //     data,
    //     // config
    //   );
    //   
    //   console.log('Vacancy posted:', response.data);
    //   alert('Vacancy posted successfully!');
    //   reset(); // Clear the form
    //
    // } catch (err) {
    //   console.error('Failed to post vacancy:', err);
    //   alert('Error: ' + err.response?.data?.message || 'Could not post vacancy');
    // }
    
    // For testing without backend:
    alert('Vacancy submitted! Check the console.');
    reset();
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Post a New Vacancy</h1>
      
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="title">
            Job Title
            {errors.title && <span className="required-indicator">*</span>}
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Job title is required' })}
          />
          {errors.title && <p className="error-message">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location">
            Location
            {errors.location && <span className="required-indicator">*</span>}
          </label>
          <input
            id="location"
            type="text"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && <p className="error-message">{errors.location.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Job Type</label>
          <select id="type" {...register('type')} className="form-select">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary (Optional)</label>
          <input
            id="salary"
            type="text"
            placeholder="e.g., 50,000 LKR or 'Competitive'"
            {...register('salary')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Job Description
            {errors.description && <span className="required-indicator">*</span>}
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="requirements">
            Requirements
            {errors.requirements && <span className="required-indicator">*</span>}
          </label>
          <textarea
            id="requirements"
            {...register('requirements', { required: 'Requirements are required' })}
          />
          {errors.requirements && <p className="error-message">{errors.requirements.message}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Post Job</button>
          <button 
            type="button" 
            className="form-button secondary"
            onClick={() => reset()}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default PostVacancyPage;