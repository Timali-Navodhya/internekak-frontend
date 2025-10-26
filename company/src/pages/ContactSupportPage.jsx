// src/pages/ContactSupportPage.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './PageContent.css'; // Import the new CSS file

function ContactSupportPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    // Set default values from your UI
    defaultValues: {
      name: 'IFS', // Or fetch from user context
      email: 'ifs@example.com' // Or fetch from user context
    }
  });

  const onSubmit = async (data) => {
    console.log('Support ticket data:', data);
    
    // TODO: Connect to your backend support endpoint
    // try {
    //   await axios.post('http://localhost:5000/api/support/ticket', data);
    //   alert('Message sent successfully!');
    //   reset(); // Clear the form
    // } catch (err) {
    //   alert('Failed to send message.');
    // }
    alert('Form submitted (check console for data)');
    reset();
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Contact Site Support</h1>
      
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label htmlFor="name">
            Name
            {errors.name && <span className="required-indicator">*</span>}
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email address
            {errors.email && <span className="required-indicator">*</span>}
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message
            {errors.message && <span className="required-indicator">*</span>}
          </label>
          <textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && <p className="error-message">{errors.message.message}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Submit</button>
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

export default ContactSupportPage;