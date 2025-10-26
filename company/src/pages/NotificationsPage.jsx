// src/pages/NotificationsPage.jsx

import React from 'react';
import './PageContent.css'; // Re-use the same CSS

// Mock data for notifications
const mockNotifications = [
  { id: 1, text: 'Navodhya has applied for the "Junior Developer" role.', time: '2 hours ago', unread: true },
  { id: 2, text: 'Your "Senior QA" vacancy post is now live.', time: '1 day ago', unread: false },
  { id: 3, text: 'Sithumi has sent you a new message.', time: '1 day ago', unread: false },
  { id: 4, text: 'Admin: Welcome to INTERNEKAK.LK!', time: '2 days ago', unread: false },
];

function NotificationsPage() {
  return (
    <div className="page-container">
      <h1 className="page-header">Notifications</h1>
      
      <div className="notification-list-container">
        {mockNotifications.length > 0 ? (
          <ul className="notification-list">
            {mockNotifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`notification-item ${notification.unread ? 'unread' : ''}`}
              >
                <div className="notification-text">{notification.text}</div>
                <div className="notification-time">{notification.time}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no new notifications.</p>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;