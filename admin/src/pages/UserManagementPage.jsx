// admin/src/pages/UserManagementPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PageContent.css'; // Re-using our styles

function UserManagementPage() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // We must update the port to 5001
        const response = await axios.get('http://localhost:5001/api/admin/users');
        setStudents(response.data.data.students || []);
        setCompanies(response.data.data.companies || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
        console.error(err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleUserDelete = async (userId, userType) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // We must update the port to 5001
        await axios.delete(`http://localhost:5001/api/admin/users/${userType}/${userId}`);
        
        // Refresh list
        if (userType === 'student') {
          setStudents(students.filter(s => s._id !== userId));
        } else {
          setCompanies(companies.filter(c => c._id !== userId));
        }
        alert('User deleted successfully');
      } catch (err) {
        alert('Failed to delete user.');
      }
    }
  };
  
  // TODO: Add update/block user logic

  if (loading) return <div className="page-container"><p>Loading users...</p></div>;
  if (error) return <div className="page-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="page-container">
      <h1 className="page-header">User Management</h1>

      {/* --- Companies Table --- */}
      <h2 className="table-title">Companies ({companies.length})</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company => (
              <tr key={company._id}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.telephone}</td>
                <td>{company.isActive ? 'Active' : 'Inactive'}</td>
                <td className="table-actions">
                  <button className="form-button small secondary">Edit</button>
                  <button 
                    className="form-button small danger"
                    onClick={() => handleUserDelete(company._id, 'company')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Students Table --- */}
      <h2 className="table-title">Students ({students.length})</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Institute</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.institute || 'N/A'}</td>
                <td>{student.isActive ? 'Active' : 'Inactive'}</td>
                <td className="table-actions">
                  <button className="form-button small secondary">Edit</button>
                  <button 
                    className="form-button small danger"
                    onClick={() => handleUserDelete(student._id, 'student')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagementPage;