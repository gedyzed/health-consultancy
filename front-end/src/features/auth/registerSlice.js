import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserAPI } from './registerAPI';

// Async Thunk
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, thunkAPI) => {
    try {
      const data = await registerUserAPI(userData);
      return data;
    } catch (error) {
      let message = 'Registration failed';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            message = 'Invalid request data';
            break;
          case 409:
            message = 'Email already registered';
            break;
          default:
            message = error.response.data?.message || message;
        }
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Registration successful!';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      });
  },
});

export const { clearStatus } = registerSlice.actions;
export default registerSlice.reducer;
