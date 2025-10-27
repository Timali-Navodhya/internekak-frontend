// admin/src/pages/NotificationPage.jsx

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './PageContent.css'; 

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // --- Fetch Notifications ---
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Auth token sent automatically
      const response = await axios.get('http://localhost:5001/api/admin/notifications');
      setNotifications(response.data.data.notifications || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notifications');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // --- Handle Create Notification ---
  const onSubmit = async (data) => {
    try {
      // Auth token sent automatically
      await axios.post('http://localhost:5001/api/admin/notifications', data);
      alert('Notification created successfully!');
      reset(); 
      fetchNotifications(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create notification');
    }
  };
  
  // --- Handle Delete Notification ---
  const handleDelete = async (notificationId) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await axios.delete(`http://localhost:5001/api/admin/notifications/${notificationId}`);
        alert('Notification deleted');
        fetchNotifications(); // Refresh list
      } catch (err) {
        alert('Failed to delete notification.');
      }
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Notification Management</h1>

      {/* --- Create Notification Form --- */}
      <h2 className="table-title">Create New Notification</h2>
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input id="title" type="text" {...register('title', { required: true })} />
          {errors.title && <p className="error-message">Title is required</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message*</label>
          <textarea id="message" {...register('message', { required: true })} />
           {errors.message && <p className="error-message">Message is required</p>}
        </div>
         <div className="form-group">
          <label htmlFor="type">Type</label>
          <select id="type" {...register('type')} className="form-select">
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="alert">Alert</option>
            <option value="job_alert">Job Alert</option>
          </select>
        </div>
         <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" {...register('priority')} className="form-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* TODO: Add field for recipient (user ID or 'all') if needed */}
        <div className="form-actions">
          <button type="submit" className="form-button">Send Notification</button>
        </div>
      </form>
      
      {/* --- Display Notifications Table --- */}
      <h2 className="table-title">Sent Notifications</h2>
      {loading && <p>Loading notifications...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map(notif => (
                <tr key={notif._id}>
                  <td>{notif.title}</td>
                  <td>{notif.message.substring(0, 50)}...</td>
                  <td>{notif.type}</td>
                  <td>{new Date(notif.createdAt).toLocaleDateString()}</td>
                  <td className="table-actions">
                    <button className="form-button small secondary">Edit</button>
                    <button 
                      className="form-button small danger"
                      onClick={() => handleDelete(notif._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* TODO: Add pagination */}
        </div>
      )}
    </div>
  );
}

export default NotificationPage;