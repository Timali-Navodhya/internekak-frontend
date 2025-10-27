// student/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth
import './AuthPages.css'; 

function RegisterPage() {
  // 2. Rename 'register' to 'formRegister' to avoid conflict
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  
  // 3. Get the 'register' function from context
  const { register: authRegister } = useAuth();

  const onSubmit = async (data) => {
    setApiError(null);
    console.log('Student Registration data:', data);

    try {
      // 4. Call the context register function
      await authRegister(data);
      
      alert('Registration successful! Please log in.');
      navigate('/login'); // Navigate to login page

    } catch (err) {
      console.error('Registration failed:', err);
      setApiError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create Student Account</h2>
        
        {apiError && <div className="error-banner">{apiError}</div>}

        <div className="form-group">
          <label>Full Name*</label>
          {/* 5. Use 'formRegister' here */}
          <input {...formRegister('name', { required: 'Name is required' })} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Email*</label>
          {/* 5. Use 'formRegister' here */}
          <input type="email" {...formRegister('email', { required: 'Email is required' })} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password*</label>
          {/* 5. Use 'formRegister' here */}
          <input type="password" {...formRegister('password', { required: 'Password is required' })} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label>Institute</label>
          {/* 5. Use 'formRegister' here */}
          <input {...formRegister('institute')} />
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