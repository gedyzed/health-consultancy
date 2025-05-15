import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const saveMessage = createAsyncThunk(
  'app/insertMessage',
  async (messageData, thunkAPI) => {
    try {
      
      const res = await fetch(`${BASE_URL}/message/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });

      if (!res.ok) throw new Error('Failed to save message');

      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'app/registerUser',
  async (username, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/create/agora/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      return { username };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getUserToken = createAsyncThunk(
  'app/getUserToken',
  async (username, { rejectWithValue }) => {
    try {
      console.log(BASE_URL)
      const res = await fetch(`${BASE_URL}/agora/token/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to get token');

      return { token: data.token };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

