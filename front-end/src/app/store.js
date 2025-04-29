import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './features/appointmentBooking/appointmentSlice';

 const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
  },
});
export default store;