import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI } from './loginAPI';

// Async Thunk for login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginUserAPI({ email, password });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
       state.token = action.payload.authorisation.token;
state.user = action.payload.user;
       localStorage.setItem('token', action.payload.authorisation.token);
       localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong.';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  },
});

export const { logout, clearAuthState } = loginSlice.actions;
export default loginSlice.reducer;