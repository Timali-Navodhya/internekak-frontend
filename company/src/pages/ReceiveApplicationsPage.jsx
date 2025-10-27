// company/src/pages/ReceiveApplicationsPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PageContent.css'; // Re-using styles

function ReceiveApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLinkForAppId, setEditingLinkForAppId] = useState(null); // Track which app's link is being edited
  const [linkInputValue, setLinkInputValue] = useState(''); // Store the link being typed

  // --- Fetch Applications ---
  const fetchApplications = async () => { // Function to allow re-fetching
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5001/api/companies/applications');
      setApplications(response.data.data.applications || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch applications');
      console.error("Fetch applications error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []); // Run once on component mount

  // --- Functions for setting the link (From Original) ---
  const handleSetLinkClick = (app) => {
    setEditingLinkForAppId(app._id); // Set the ID of the app being edited
    setLinkInputValue(app.interviewLink || ''); // Pre-fill with existing link, if any
  };

  const handleSaveLink = async (app) => {
    setError(null);
    try {
      // Call the new backend endpoint
      await axios.put(
        `http://localhost:5001/api/companies/vacancies/${app.vacancyId}/applications/${app._id}/link`,
        { interviewLink: linkInputValue } // Send the link from the input
      );

      // Update the application list locally after saving
      setApplications(prevApps =>
        prevApps.map(prevApp =>
          prevApp._id === app._id ? { ...prevApp, interviewLink: linkInputValue } : prevApp
        )
      );
      alert('Interview link saved!');
      setEditingLinkForAppId(null); // Stop editing mode
      setLinkInputValue('');      // Clear input

    } catch (err) {
        console.error("Save link error:", err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to save link.');
        // Optionally keep editing mode open on error, or close it
        // setEditingLinkForAppId(null);
    }
  };

  const handleCancelLinkEdit = () => {
    setEditingLinkForAppId(null);
    setLinkInputValue('');
  };

  // --- NEW: Handle Status Update (From Update) ---
   const handleUpdateStatus = async (app, newStatus) => {
    setError(null); // Clear previous errors
    try {
      await axios.put(
        `http://localhost:5001/api/companies/vacancies/${app.vacancyId}/applications/${app._id}/status`,
        { status: newStatus }
      );

      // Update the status locally for immediate feedback
      setApplications(prevApps =>
        prevApps.map(prevApp =>
          prevApp._id === app._id ? { ...prevApp, status: newStatus } : prevApp
        )
      );
      alert(`Application marked as ${newStatus}!`);

    } catch (err) {
      console.error("Update status error:", err.response?.data || err.message);
      // Display error specific to this action if possible, or use general error state
      setError(err.response?.data?.message || `Failed to update status to ${newStatus}.`);
    }
  };

  // --- Download CV Placeholder (From Update) ---
  const handleDownload = (applicationId, studentName) => {
     alert(`Downloading CV for ${studentName} (ID: ${applicationId})... (feature not implemented)`);
     // In a real app, you might do this:
     // window.open(`http://localhost:5001/api/applications/${applicationId}/cv`, '_blank');
  };

  // --- Render ---
  return (
    <div className="page-container">
      <h1 className="page-header">Receive Applications</h1>

      {loading && <p>Loading applications...</p>}
      {/* Display general error (but not if we are just in link-edit mode) */}
      {error && !editingLinkForAppId && <p className="error-message">{error}</p>}

      {!loading && (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Vacancy Title</th>
                <th>Status</th>
                <th>Interview Link</th>
                <th>Actions</th> {/* Added new Actions column */}
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No applications received yet.</td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.student?.name || 'Unknown'}</td>
                    <td>{app.vacancyTitle}</td>
                    <td>
                      <span className={`status-badge status-${app.status}`}>
                        {app.status}
                      </span>
                    </td>
                    
                    {/* Interview Link Column (From Original) */}
                    <td>
                      {editingLinkForAppId === app._id ? (
                        <div className="link-edit-container">
                          <input
                            type="url"
                            value={linkInputValue}
                            onChange={(e) => setLinkInputValue(e.target.value)}
                            placeholder="Paste interview link (Zoom, Meet, etc.)"
                            style={{ width: '250px', marginRight: '5px' }}
                          />
                          <button
                              className="form-button small"
                              onClick={() => handleSaveLink(app)}
                              disabled={!linkInputValue.trim()} // Disable if input is empty
                          >
                             Save
                          </button>
                          <button
                              className="form-button small secondary"
                              onClick={handleCancelLinkEdit}
                              style={{ marginLeft: '5px' }}
                           >
                             Cancel
                          </button>
                          {/* Display save error specific to this row */}
                          {error && editingLinkForAppId === app._id && <p className="error-message" style={{marginTop: '5px'}}>{error}</p>}
                        </div>
                      ) : (
                        <div className="link-display-container">
                          {app.interviewLink ? (
                            <a href={app.interviewLink} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                              View Link
                            </a>
                          ) : (
                            <span style={{ marginRight: '10px', color: '#888' }}>No link set</span>
                          )}
                          <button
                            className="form-button small secondary"
                            onClick={() => handleSetLinkClick(app)}
                          >
                            {app.interviewLink ? 'Edit Link' : 'Set Link'}
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Actions Column (From Update) */}
                    <td className="table-actions">
                       {/* Download CV Button */}
                       <button
                         className="form-button small secondary"
                         onClick={() => handleDownload(app._id, app.student?.name)}
                       >
                         CV
                       </button>
                       {/* Shortlist Button */}
                       {app.status !== 'shortlisted' && app.status !== 'rejected' && ( // Don't show if already shortlisted/rejected
                         <button
                           className="form-button small"
                           onClick={() => handleUpdateStatus(app, 'shortlisted')}
                           title="Shortlist this candidate"
                         >
                          Shortlist
                         </button>
                       )}
                       {/* Reject Button */}
                       {app.status !== 'rejected' && ( // Don't show if already rejected
                         <button
                           className="form-button small danger"
                           onClick={() => handleUpdateStatus(app, 'rejected')}
                            title="Reject this candidate"
                         >
                           Reject
                         </button>
                       )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReceiveApplicationsPage;