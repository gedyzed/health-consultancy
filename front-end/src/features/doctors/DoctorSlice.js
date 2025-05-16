// doctorSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileById } from "../booking/bookingSliceApi";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    loading: false,
    error: null,
    profile: {
      user_id: null,
      email: "",
      role: "",
      doctor: {
        doctor_id: null,
        fullName: "",
        aboutMe: "",
        yearOfExperience: 0,
        pricing: "",
        image: "",
        idImage: "",
        languages: [],
        certificates: [],
        educations: [],
        specializations: [],
        appointments: []
      }
    }
  },
  reducers: {
    setFullProfile: (state, action) => {
      state.profile = action.payload;
    }
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

export const { setFullProfile } = doctorSlice.actions;
export default doctorSlice.reducer;
