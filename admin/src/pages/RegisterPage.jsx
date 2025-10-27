// admin/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function RegisterPage() {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const { register: authRegister } = useAuth(); // Get register func from context

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      // Call the register function from context
      await authRegister(data);
      alert('Admin registered successfully! Please log in.');
      navigate('/login'); // Go to login page after registering
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create New Admin</h2>
        
        {apiError && <div className="error-banner">{apiError}</div>}

        <div className="form-group">
          <label>Full Name*</label>
          <input 
            {...formRegister('name', { required: 'Name is required' })} 
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input 
            type="email" 
            {...formRegister('email', { required: 'Email is required' })} 
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password*</label>
          <input 
            type="password" 
            {...formRegister('password', { required: 'Password is required' })} 
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <button type="submit" className="auth-button">Register Admin</button>
        
        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;