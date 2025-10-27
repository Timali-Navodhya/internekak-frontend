// admin/src/pages/SubscriptionPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageContent.css'; 

function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        // Auth token sent automatically
        const response = await axios.get('http://localhost:5001/api/admin/subscriptions');
        setSubscriptions(response.data.data.subscriptions || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch subscriptions');
      }
      setLoading(false);
    };

    fetchSubscriptions();
  }, []);

  // Placeholder for update logic
  const handleUpdateSubscription = (subId, newData) => {
      console.log("Update subscription:", subId, newData);
      // TODO: Implement API call to PUT /api/admin/subscriptions/:subscriptionId
      alert("Update functionality not yet implemented.");
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Subscription Management</h1>
      
      {loading && <p>Loading subscriptions...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Plan Type</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan="6">No subscriptions found.</td>
                </tr>
              ) : (
                subscriptions.map(sub => (
                  <tr key={sub._id}>
                    <td>{sub.company?.name || 'N/A'}</td>
                    <td>{sub.planType}</td>
                    <td>
                      <span className={`status-badge status-${sub.status}`}> 
                        {sub.status}
                      </span>
                    </td>
                    <td>{new Date(sub.startDate).toLocaleDateString()}</td>
                    <td>{new Date(sub.endDate).toLocaleDateString()}</td>
                    <td className="table-actions">
                       <button 
                         className="form-button small secondary"
                         onClick={() => handleUpdateSubscription(sub._id, { status: 'new_status' })}
                       >
                         Edit
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* TODO: Add pagination controls based on response.data.pagination */}
        </div>
      )}
    </div>
  );
}

export default SubscriptionPage;