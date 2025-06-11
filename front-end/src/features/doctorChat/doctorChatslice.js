import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Async thunk to fetch doctor list for a patient
export const fetchDoctor = createAsyncThunk(
  'doctorChat/fetchDoctor',
  async (doctorId, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/patientList/${doctorId}`);
      console.log("****", response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to fetch doctor list'
      );
    }
  }
);

const doctorChatSlice = createSlice({
  name: 'doctorChat',
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
        state.loading = false;
      });
  },
});

export const { setDoctors } = doctorChatSlice.actions;
export default doctorChatSlice.reducer;
