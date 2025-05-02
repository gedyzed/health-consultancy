// features/booking/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingId: "APPT-1315",
  doctor: {
    name: "Dr. Jane Doe",
    specialty: "Dermatologist",
    profileLink: "/to//doctor//profile",
  },
  time: "8:00 - 9:00 on Friday, Jan 27",
  price: "500 ETB",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking(state, action) {
      return { ...state, ...action.payload };
    },
    clearBooking() {
      return initialState;
    },
  },
});

export const { setBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
