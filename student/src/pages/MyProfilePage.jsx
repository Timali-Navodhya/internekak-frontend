// student/src/pages/MyProfilePage.jsx

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PageContent.css'; // Re-using our styles

function MyProfilePage() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm(); // Added 'watch'
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState(''); // State for AI suggestions
  const [suggestionLoading, setSuggestionLoading] = useState(false); // Loading state for AI

  // --- 1. Load existing profile data ---
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Auth token is sent automatically by AuthContext
        const { data } = await axios.get('http://localhost:5001/api/students/profile');
        
        // Convert skills array back to string for the form input
        const profileData = {
          ...data.data, // Assuming profile data is nested under 'data'
          skills: data.data.skills ? data.data.skills.join(', ') : '' // Handle case where skills might be missing
        };
        reset(profileData); // Pre-fill the form
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load profile", err);
        // Display error to user, maybe set an error state
        alert("Could not load your profile data. Please try again later.");
        setIsLoading(false); // Ensure loading stops even on error
      }
    };
    loadProfile();
  }, [reset]);

  // --- 2. Handle profile update form submission ---
  const onSubmit = async (data) => {
    // Convert comma-separated skills string back to an array, handling empty strings
    const skillsArray = data.skills ? data.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '') : [];
    
    const updatedData = {
        ...data,
        skills: skillsArray
    };
    console.log('Submitting Updated Profile Data:', updatedData);

    try {
      // Auth token is sent automatically
      await axios.put('http://localhost:5001/api/students/profile', updatedData);
      alert('Profile updated successfully!');
      navigate('/'); // Go back to search page or dashboard
    } catch (err) {
      console.error('Profile update error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  // --- 3. Handle Get AI Suggestions ---
  const handleGetSuggestions = async () => {
    setSuggestionLoading(true);
    setSuggestions('');
    const currentBio = watch('bio'); // Get current text from the bio field using watch

    if (!currentBio || currentBio.trim() === '') {
        alert('Please enter something in the Biography / Resume Text field first.');
        setSuggestionLoading(false);
        return;
    }

    try {
      // Auth token is sent automatically
      const response = await axios.post('http://localhost:5001/api/ai/suggest-resume', {
          resumeText: currentBio 
      });
      setSuggestions(response.data.suggestions);
    } catch (error) {
        console.error("AI Suggestion error:", error.response?.data || error.message);
        setSuggestions('Could not get suggestions at this time. Please try again later.');
    }
    setSuggestionLoading(false);
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="page-container">
        <h1 className="page-header">My Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="page-container">
      <h1 className="page-header">My Profile</h1>
      
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

        <div className="form-group">
          <label htmlFor="institute">Institute</label>
          <input 
            id="institute" 
            type="text" 
            {...register('institute')} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills (comma-separated)</label>
          <input 
            id="skills" 
            type="text" 
            placeholder="e.g., React, Node.js, Python"
            {...register('skills')} 
          />
           <small>Separate skills with a comma (e.g., Java, Spring, SQL).</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="bio">Biography / Resume Text</label>
          <textarea 
            id="bio" 
            {...register('bio')} 
            rows={6} // Make textarea a bit larger
          />
           <small>Paste your resume text or write a short bio here to get AI feedback.</small>
        </div>

        {/* --- AI Suggestions Area --- */}
        <div className="form-actions">
          <button 
            type="button" 
            className="form-button secondary" 
            onClick={handleGetSuggestions}
            disabled={suggestionLoading}
          >
            {suggestionLoading ? 'Getting Suggestions...' : 'Get AI Suggestions'}
          </button>
        </div>
        {suggestions && (
          <div className="ai-suggestions">
            <h3>AI Feedback:</h3>
            <pre>{suggestions}</pre> {/* Use <pre> to preserve formatting */}
          </div>
        )}
        {/* --- End AI Suggestions Area --- */}

        {/* --- Save/Cancel Buttons --- */}
         <div className="form-actions" style={{marginTop: '20px'}}>
          <button type="submit" className="form-button">Save Changes</button>
          <button 
            type="button" 
            className="form-button secondary"
            onClick={() => navigate('/')} // Navigate back to home/search page
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyProfilePage;