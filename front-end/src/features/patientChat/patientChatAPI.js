// features/patientChat/patientChatAPI.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//const BASE_URL = ''; // Adjust this based on your Laravel backend

// Fetch chat messages for a patient with a specific doctor
export const fetchPatientMessages = createAsyncThunk(
  'patientChat/fetchMessages',
  async (doctorId, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/patient/messages/${doctorId}`);
      return response.data.messages; // assuming your backend returns { messages: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Send a new message from patient
export const sendPatientMessage = createAsyncThunk(
  'patientChat/sendMessage',
  async ({ doctorId, message }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/patient/messages/${doctorId}`, {
        message,
      });
      return response.data.message; // assuming backend returns { message: { ... } }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
