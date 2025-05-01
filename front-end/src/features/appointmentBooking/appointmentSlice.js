import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [], // Added appointments array
  symptoms: [],
  paymentMethod: {
    bank: "",
    cardNumber: "",
  },
  selectedDate: null,
  selectedTimeSlot: "",
};

const AppointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setSymptoms: (state, action) => {
      state.symptoms = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedTimeSlot: (state, action) => {
      state.selectedTimeSlot = action.payload;
    },
  },
});

// Export actions
export const {
  setAppointments,
  setSymptoms,
  setPaymentMethod,
  setSelectedDate,
  setSelectedTimeSlot
} = AppointmentSlice.actions;

// Export selectors
export const selectAppointments = (state) => state.appointment.appointments;
export const selectSymptoms = (state) => state.appointment.symptoms;
export const selectPaymentMethod = (state) => state.appointment.paymentMethod;

export default AppointmentSlice.reducer;