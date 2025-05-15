// features/profile/editPatientProfile/editPatientProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { editPatientProfileAPI } from './editPatientProfileAPI';

// Async thunk for updating patient profile
export const updatePatientProfile = createAsyncThunk(
  'editPatientProfile/update',
  async (formData, thunkAPI) => {
    try {
      const data = await editPatientProfileAPI(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Update failed');
    }
  }
);

const editPatientProfileSlice = createSlice({
  name: 'editPatientProfile',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearProfileState: (state) => {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePatientProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearProfileState } = editPatientProfileSlice.actions;
export default editPatientProfileSlice.reducer;
