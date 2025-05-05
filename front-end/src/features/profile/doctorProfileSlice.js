
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  about: '',
  specialization: '',
  workExperience: '',
  institution: '',
  languages: '',
  degree: '',
  price: '',
  graduationYear: '',
  certification: '',
};

const doctorProfileSlice = createSlice({
  name: 'doctorProfile',
  initialState,
  reducers: {
    setDoctorProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setDoctorProfile } = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;
