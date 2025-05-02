import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../features/appointmentBooking/appointmentSlice';
import profileReducer from '../features/profile/profileSlice'; // Fixed spelling
import bookingReducer from "../features/appointmentBooking/bookingSlice";

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    profile: profileReducer,// Added profile reducer
    booking:bookingReducer
  }
});