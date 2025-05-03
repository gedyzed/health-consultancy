import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImage: null,
  about: "",
  fullName: "",
  gender: "",
  idImage: null,
  certifications: "",
};

const patientSetProfileSlice = createSlice({
  name: "patientSetProfile",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetProfile: () => initialState,
  },
});

export const { updateField, resetProfile } = patientSetProfileSlice.actions;
export default patientSetProfileSlice.reducer;