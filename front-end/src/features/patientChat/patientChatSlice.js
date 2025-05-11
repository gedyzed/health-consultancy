// features/patientChat/patientChatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPatientMessages, sendPatientMessage } from './patientChatAPI';

const patientChatSlice = createSlice({
  name: 'patientChat',
  initialState: {
    messages: [],
    selectedDoctor: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectDoctorForChat: (state, action) => {
      state.selectedDoctor = action.payload;
      state.messages = []; // Clear previous chat messages
    },
    clearChat: (state) => {
      state.messages = [];
      state.selectedDoctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchPatientMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load messages';
      })
      .addCase(sendPatientMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { selectDoctorForChat, clearChat } = patientChatSlice.actions;
export default patientChatSlice.reducer;
