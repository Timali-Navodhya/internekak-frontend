// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// We will create this CSS file next
import './AuthPages.css'; 

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  // This function runs when the form is submitted
  const onSubmit = async (data) => {
    setApiError(null); // Clear old errors
    console.log('Form data:', data);

    try {
      // TODO: Replace with your actual backend URL
      const response = await axios.post('http://localhost:5000/api/company/login', {
        email: data.username, // Your API expects 'email'
        password: data.password,
      });

      console.log('Login success:', response.data);
      // TODO: Save the token (e.g., in localStorage)
      // localStorage.setItem('token', response.data.data.token);

      // Navigate to the dashboard on success
      navigate('/dashboard');

    } catch (err) {
      console.error('Login failed:', err);
      if (err.response && err.response.data) {
        setApiError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setApiError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In to InternEkak</h2>
        <p>Welcome back! Sign in to continue</p>

        {/* Show API error message if it exists */}
        {apiError && <div className="error-banner">{apiError}</div>}

        <div className="form-group">
          <label>User Name*</label>
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <button type="submit" className="auth-button">Sign In</button>

        <div className="auth-links">
          <Link to="/reset-password">Forgot password?</Link>
          <p>Don't have an account? <Link to="/register">Sign up now</Link></p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;