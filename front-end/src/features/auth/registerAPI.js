// src/features/auth/registerAPI.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Named export
export const registerUserAPI = async (userData) => {
  const response = await api.post('/api/signUp', userData);
  return response.data;
};
