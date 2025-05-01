import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../features/appointmentBooking/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer
    // Add other reducers here if needed
  }
});