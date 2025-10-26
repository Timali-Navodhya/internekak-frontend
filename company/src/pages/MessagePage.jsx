// src/pages/MessagePage.jsx

import React, { useState } from 'react';
import './MessagePage.css'; // We'll create this new CSS file

// Mock data
const mockContacts = [
  { id: 1, name: 'Navodhya' },
  { id: 2, name: 'Sithumi' },
  { id: 3, name: 'Admin Support' },
];

const mockMessages = [
  { id: 1, sender: 'Navodhya', text: 'Hi, I have a question about the internship.' },
  { id: 2, sender: 'You', text: 'Hi Navodhya, happy to help. What is your question?' },
];

function MessagePage() {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [messages, setMessages] = useState(mockMessages);

  return (
    <div className="message-page-layout">
      
      {/* --- Contacts List --- */}
      <div className="contacts-sidebar">
        <div className="contacts-header">
          <h3>Contacts</h3>
          <input type="search" placeholder="Search..." />
        </div>
        <ul className="contacts-list">
          {mockContacts.map(contact => (
            <li 
              key={contact.id} 
              className={`contact-item ${selectedContact.id === contact.id ? 'active' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              {contact.name}
            </li>
          ))}
        </ul>
      </div>

      {/* --- Chat Window --- */}
      <div className="chat-window">
        <div className="chat-header">
          <h3>{selectedContact.name}</h3>
        </div>
        <div className="chat-messages">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}
            >
              <span className="message-text">{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <input type="text" placeholder="Type a message..." />
          <button className="form-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;