// admin/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageContent.css'; // Re-using styles

function DashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // Auth token sent automatically
        const response = await axios.get('http://localhost:5001/api/admin/analytics');
        setAnalytics(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch analytics');
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-header">Admin Dashboard - Analytics</h1>

      {loading && <p>Loading analytics data...</p>}
      {error && <p className="error-message">{error}</p>}

      {analytics && (
        <div className="analytics-grid">
          {/* Overview Section */}
          <div className="analytics-card">
            <h2>Overview</h2>
            <p><strong>Total Students:</strong> {analytics.overview?.totalStudents ?? 'N/A'}</p>
            <p><strong>Total Companies:</strong> {analytics.overview?.totalCompanies ?? 'N/A'}</p>
            <p><strong>Total Subscriptions:</strong> {analytics.overview?.totalSubscriptions ?? 'N/A'}</p>
            <p><strong>Active Subscriptions:</strong> {analytics.overview?.activeSubscriptions ?? 'N/A'}</p>
          </div>

          {/* Top Companies Section */}
          <div className="analytics-card">
            <h2>Top 5 Companies Hiring</h2>
            {analytics.topCompaniesHiring && analytics.topCompaniesHiring.length > 0 ? (
              <ul>
                {analytics.topCompaniesHiring.map(company => (
                  <li key={company._id}>
                    {company.name} ({company.jobCount} jobs)
                  </li>
                ))}
              </ul>
            ) : (
              <p>No active job postings found.</p>
            )}
          </div>

          {/* Payment Breakdown Section (Simplified) */}
          <div className="analytics-card">
            <h2>Payment Breakdown (All Time)</h2>
             {analytics.paymentBreakdown && analytics.paymentBreakdown.length > 0 ? (
              <ul>
                {analytics.paymentBreakdown.map(plan => (
                  <li key={plan._id}>
                    <strong>{plan._id}:</strong> {plan.count} subscriptions
                    {/* (Revenue: ${plan.totalRevenue}) - Display if needed */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment data found.</p>
            )}
          </div>

           {/* Revenue Trend (Placeholder - Needs Charting Library) */}
           {/*
           <div className="analytics-card">
             <h2>Revenue Trend</h2>
             <p>Chart data available in console log.</p>
             {console.log('Revenue Trend Data:', analytics.revenueTrend)}
           </div>
           */}

        </div>
      )}
    </div>
  );
}

export default DashboardPage;