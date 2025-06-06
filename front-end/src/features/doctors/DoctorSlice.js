// doctorSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileById } from "./doctorsProfileApi";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    loading: false,
    error: null,
    profile: {}
  },
  reducers: {
    setDoctorProfile: (state, action) => {
      state.profile = action.payload;
    },
    
    clearDoctorProfile(state) {
      state.doctorProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setDoctorProfile } = doctorSlice.actions;
export default doctorSlice.reducer;
