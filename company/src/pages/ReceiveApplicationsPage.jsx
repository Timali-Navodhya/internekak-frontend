// src/pages/ReceiveApplicationsPage.jsx

import React from 'react';
import './PageContent.css'; // Re-use the same CSS

// Mock data to simulate fetching from your backend
const mockApplications = [
  { id: 1, name: 'Navodhya', date: '12/08/25' },
  { id: 2, name: 'Dushara', date: '12/06/25' },
  { id: 3, name: 'Sithumi', date: '25/06/25' },
];

function ReceiveApplicationsPage() {

  const handleDownload = (applicationId, applicantName) => {
    // In a real app, this would trigger a download from your API
    console.log(`Downloading CV for ${applicantName} (ID: ${applicationId})`);
    alert(`Downloading CV for ${applicantName}...`);
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Receive Applications</h1>
      
      <div className="application-list-container">
        {mockApplications.length > 0 ? (
          <ul className="application-list">
            {mockApplications.map((app) => (
              <li key={app.id} className="application-item">
                <span className="applicant-name">{app.name}</span>
                <span className="application-date">{app.date}</span>
                <button 
                  className="form-button small"
                  onClick={() => handleDownload(app.id, app.name)}
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No new applications found.</p>
        )}
      </div>
    </div>
  );
}

export default ReceiveApplicationsPage;