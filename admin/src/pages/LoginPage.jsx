// admin/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import
import './AuthPages.css';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const { login } = useAuth(); // 2. Get login function

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      // 3. Call context login
      await login(data.email, data.password);
      navigate('/dashboard'); // Navigate to admin dashboard
    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Admin Portal Login</h2>
        {apiError && <div className="error-banner">{apiError}</div>}
        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit" className="auth-button">Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;