import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
