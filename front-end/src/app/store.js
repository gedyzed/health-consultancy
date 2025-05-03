import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../features/appointmentBooking/appointmentSlice';
import profileReducer from '../features/profile/profileSlice'; // Fixed spelling
import bookingReducer from "../features/appointmentBooking/bookingSlice";
import patientSetProfileReducer from "../features/profile/patientSetProfileSlice"; // Added patientSetProfile reducer
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    profile: profileReducer,// Added profile reducer
    booking:bookingReducer,
    patientSetProfile: patientSetProfileReducer, // Added patientSetProfile reducer
    register:registerReducer,
    login:loginReducer

  }
});