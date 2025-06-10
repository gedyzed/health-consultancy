import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for async fetching of chat messages
export const fetchDoctor = createAsyncThunk(
  'patientChat/fetchMessages',
  async (pId, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/doctorList/${pId}`);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      .addCase(fetchDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setDoctors, selectDoctor, addMessage } = doctorChatSlice.actions;
export default doctorChatSlice.reducer;
