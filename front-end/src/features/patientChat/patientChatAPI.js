import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const fetchPatient = createAsyncThunk(
  'patientChat/fetchMessages',
  async (doctorId, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/patientList/${doctorId}`);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const sendPatientMessage = createAsyncThunk(
  'patientChat/sendMessage',
  async ({ doctorId, message }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/patient/messages/${doctorId}`, {
        message,
      });
      return response.data.message; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const savePatientMessage = createAsyncThunk(
  'patientChat/saveMessage',
  async ({ doctorId, message }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/patient/messages/${patientId}`, {
        message,
      });
      return response.data.message; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

