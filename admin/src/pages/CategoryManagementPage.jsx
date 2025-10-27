// admin/src/pages/CategoryManagementPage.jsx

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './PageContent.css'; // Re-using our styles

function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // --- 1. Fetch All Categories ---
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/admin/categories');
      setCategories(response.data.data.categories || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    }
    setLoading(false);
  };

  // Run fetchCategories when the page loads
  useEffect(() => {
    fetchCategories();
  }, []);

  // --- 2. Handle Create Category Form ---
  const onSubmit = async (data) => {
    try {
      // TODO: Add auth token
      const response = await axios.post('http://localhost:5001/api/admin/categories', data);
      alert('Category created successfully!');
      reset(); // Clear the form
      fetchCategories(); // Refresh the table
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create category');
    }
  };
  
  // --- 3. Handle Delete Category ---
  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        // TODO: Add auth token
        await axios.delete(`http://localhost:5001/api/admin/categories/${categoryId}`);
        alert('Category deleted');
        fetchCategories(); // Refresh the table
      } catch (err) {
        alert('Failed to delete category.');
      }
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Category Management</h1>

      {/* --- Create Category Form --- */}
      <h2 className="table-title">Add New Category</h2>
      <form className="form-layout" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">
            Category Name
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
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register('description')}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">Create Category</button>
        </div>
      </form>
      
      {/* --- Display Categories Table --- */}
      <h2 className="table-title">All Categories</h2>
      {loading && <p>Loading categories...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description || 'N/A'}</td>
                  <td className="table-actions">
                    <button className="form-button small secondary">Edit</button>
                    <button 
                      className="form-button small danger"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CategoryManagementPage;