// company/src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // <-- We'll use this

  useEffect(() => {
    // This runs when the app loads to check if the user is already logged in
    const loadUserFromToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        
        // TODO: This is the "correct" way, but your backend is missing this one endpoint.
        // For now, we'll just assume the token is valid.
        // try {
        //   const response = await axios.get('http://localhost:5001/api/companies/profile');
        //   setUser(response.data.data.company);
        // } catch (err) {
        //   console.error("Token invalid, logging out");
        //   setAuthToken(null);
        // }
      }
      setLoading(false);
    };
    loadUserFromToken();
  }, []);

  const setAuthToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5001/api/companies/login', { email, password });
    const { token, company } = response.data.data;
    setAuthToken(token);
    setUser(company);
    return response;
  };

  const register = async (data) => {
    const response = await axios.post('http://localhost:5001/api/companies/register', data);
    const { token, company } = response.data.data;
    setAuthToken(token);
    setUser(company);
    return response;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };
  
  const value = {
    user,
    token,
    loading, // <-- Pass loading state
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};