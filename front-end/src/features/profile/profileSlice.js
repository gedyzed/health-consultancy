
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

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;