import { createSlice } from '@reduxjs/toolkit';
import { fetchPatient } from './patientChatAPI';

const patientChatSlice = createSlice({
  name: 'patientChat',
  initialState: {
    patients: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.patients = action.payload;
        state.loading = false;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch patient data';
      });
  },
});

export const { setPatients } = patientChatSlice.actions;
export default patientChatSlice.reducer;
