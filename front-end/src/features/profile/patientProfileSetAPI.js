// src/features/profile/patientProfileThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const submitPatientProfile = createAsyncThunk(
  'patientProfile/submit',
  async (formData, thunkAPI) => {
    
    navigate = useNavigate()

    try {
      const response = await axios.post(`${BASE_URL}/patient/setProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error, error.response); // This is fine for debugging
      navigate("/profile")
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Profile submission failed'
      );
    }
  }
);
