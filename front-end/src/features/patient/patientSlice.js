import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Async thunk to fetch patient profile
export const fetchPatientProfile = createAsyncThunk(
  'patient/fetchPatientProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/patient/${id}`);
      // Return only the needed data
      const { role, email, password, patient } = response.data;
      return { role, email, password, patient };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    loading: false,
    error: null,
    role: '',
    email: '',
    password: '',
    patient: {
      patient_id: null,
      fullName: '',
      gender: '',
      aboutMe: '',
      image: '',
      idImage: '',
      created_at: '',
      updated_at: ''
    }
  },

  reducers: {
    resetPatientProfile: (state) => {
      state.loading = false;
      state.error = null;
      state.role = '';
      state.email = '';
      state.password = '';
      state.patient = {
        patient_id: null,
        fullName: '',
        gender: '',
        aboutMe: '',
        image: '',
        idImage: '',
        created_at: '',
        updated_at: ''
      };
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.patient = action.payload.patient;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetPatientProfile } = patientSlice.actions;
export default patientSlice.reducer;
