

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  symptoms: [],
  paymentMethod: {
    bank: "",
    cardNumber: "",
  },
  selectedDate: null,
  selectedTimeSlot: "",
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
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

export const { setSymptoms, setPaymentMethod, setSelectedDate, setSelectedTimeSlot } = appointmentSlice.actions;
export default appointmentSlice.reducer;
