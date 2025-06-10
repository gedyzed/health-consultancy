import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../features/appointmentBooking/AppointmentSlice';
import bookingReducer from "../features/appointmentBooking/bookingSlice";
import patientSetProfileReducer from "../features/profile/patientSetProfileSlice"; // Added patientSetProfile reducer
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';
import doctorProfileSlice from '../features/profile/doctorProfileSlice'
import doctorDashboardReducer from '../features/doctors/doctorDashboardSlice';
import doctorChatReducer from '../features/doctorChat/doctorChatSlice';
import patientChatReducer from  '../features/patientChat/patientChatSlice';
import chatSlice from "../features/chat/chatSlice"
import chatMessageReducer from "../features/chat/chatMessageSlice"
import BookingReducer from "../features/booking/bookingSliceApi"
import patientReducer from "../features/patient/patientSlice"
import doctorsReducer from "../features/doctors/DoctorSlice"
import authenticated from "../features/auth/authenticated"

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    DoctorProfile: doctorProfileSlice,// Added profile reducer
    booking:bookingReducer,
    patientSetProfile: patientSetProfileReducer, // Added patientSetProfile reducer
    register:registerReducer,
    login:loginReducer,
    doctorDashboard:doctorDashboardReducer,
    doctorChat:doctorChatReducer,
    patientChat:patientChatReducer,
    chatState:chatSlice,
    messages:chatMessageReducer,
    booking: BookingReducer,
    patient: patientReducer,
    doctor: doctorsReducer,
    auth: authenticated,
  }
});