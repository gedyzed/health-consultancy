import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDoctorMessages } from './doctorChatAPI';

// Thunk for async fetching of chat messages
export const fetchMessages = createAsyncThunk(
  'doctorChat/fetchMessages',
  async (doctorId, thunkAPI) => {
    try {
      const messages = await fetchDoctorMessages(doctorId);
      return messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching messages');
    }
  }
);

const doctorChatSlice = createSlice({
  name: 'doctorChat',
  initialState: {
    doctors: [],
    selectedDoctor: null,
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    selectDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
      state.messages = []; // Reset messages when switching doctors
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setDoctors, selectDoctor, addMessage } = doctorChatSlice.actions;
export default doctorChatSlice.reducer;
