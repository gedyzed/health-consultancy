// src/features/profile/patientProfileThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitPatientProfile = createAsyncThunk(
  'patientProfile/submit',
  async (profileData, thunkAPI) => {
    try {
      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      const response = await axios.post('/api/patient/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Profile submission failed'
      );
    }
  }
);
