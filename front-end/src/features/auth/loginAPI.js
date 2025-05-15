// src/features/auth/loginAPI.js

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use VITE_ prefix for Vite environment variable
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUserAPI = async (userData) => {
  const response = await api.post('/api/login', userData);

   // Assumes /login is your backend route
  return response.data;
};
