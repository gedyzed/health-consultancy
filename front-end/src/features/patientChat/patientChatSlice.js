// features/patientChat/patientChatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPatient, sendPatientMessage } from './patientChatAPI';

const patientChatSlice = createSlice({
  name: 'patientChat',
  initialState: {
    patients:[],
    loading: false,
    error: null,
  },
  reducers: {
    clearChat: (state) => {
      state.messages = [];
      state.selectedDoctor = null;
    },
    setPatients: (state, action) => {
      state.patients = action.payload
    }
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
        state.error = action.payload || 'Failed to load messages';
      })
      .addCase(sendPatientMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { selectDoctorForChat, clearChat, setDoctors } = patientChatSlice.actions;
export default patientChatSlice.reducer;
