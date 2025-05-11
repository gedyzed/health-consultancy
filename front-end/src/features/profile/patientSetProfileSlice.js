// src/features/profile/patientSetProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { submitPatientProfile } from './patientProfileSetAPI';

const initialState = {
  fullName: '',
  gender: '',
  about: '',
  profileImage: null,
  certification: null,
  loading: false,
  error: null,
  success: null,
};

const patientSetProfileSlice = createSlice({
  name: 'patientSetProfile',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Profile updated successfully';
      })
      .addCase(submitPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, resetProfile } = patientSetProfileSlice.actions;
export default patientSetProfileSlice.reducer;
