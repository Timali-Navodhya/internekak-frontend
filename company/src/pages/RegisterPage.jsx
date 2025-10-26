// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css'; // We re-use the same CSS file

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  // Watch the password field to validate 'confirm password'
  const password = watch('password');

  const onSubmit = async (data) => {
    setApiError(null);
    console.log('Registration data:', data);

    try {
      // Your backend expects 'name', 'email', 'password', 'address', 'telephone', 'termsAccepted'
      const response = await axios.post('http://localhost:5000/api/company/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
        telephone: data.telephone,
        termsAccepted: data.termsAccepted,
        // The 'username' field from your UI isn't in your backend,
        // so we'll use 'email' for both or you can add 'username' to your backend.
        // For now, I'll assume 'username' from the form is 'email'.
      });

      console.log('Registration success:', response.data);
      
      // TODO: Save the new token
      // localStorage.setItem('token', response.data.data.token);

      // On success, navigate to the profile creation page
      navigate('/register/profile');

    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data) {
        setApiError(err.response.data.message || 'Registration failed.');
      } else {
        setApiError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Welcome!</h2>
        
        {apiError && <div className="error-banner">{apiError}</div>}

        <div className="form-group">
          <label>Name*</label>
          <input {...register('name', { required: 'Name is required' })} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Email*</label>
          {/* Your UI shows "Username" but your API needs "email". I'll use email. */}
          <input type="email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password*</label>
          <input type="password" {...register('password', { required: 'Password is required' })} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label>Confirm Password*</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>

        <div className="form-group">
          <label>Address*</label>
          <input {...register('address', { required: 'Address is required' })} />
          {errors.address && <p className="error-message">{errors.address.message}</p>}
        </div>

        <div className="form-group">
          <label>Telephone*</label>
          <input type="tel" {...register('telephone', { required: 'Telephone is required' })} />
          {errors.telephone && <p className="error-message">{errors.telephone.message}</p>}
        </div>

        <div className="form-group-checkbox">
          <input
            type="checkbox"
            {...register('termsAccepted', { required: 'You must accept the terms' })}
          />
          <label>Agree to all Terms & Conditions</label>
          {errors.termsAccepted && <p className="error-message">{errors.termsAccepted.message}</p>}
        </div>

        <button type="submit" className="auth-button">Register</button>
        
        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;