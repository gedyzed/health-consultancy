import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:8000/api/appointments";// will be replace with with the backend url




export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch appointments");
    }
  }
);

// Create a new appointment
export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (newAppointment, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, newAppointment);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create appointment");
    }
  }
);


//initail state
const initialState = {
  appointments: [
    {
      id: 1,
      date: "2023-10-01",
      time: "10:00 AM",
      patient: "John Doe",
      status: "upcoming",
    },
    
    {
      id: 2,
      date: "2023-10-02",
      time: "11:00 AM",
      patient: "Jane Smith",
      status: "closed",
    },
    {
      id: 3,
      date: "2023-10-03",
      time: "12:00 PM",
      patient: "Alice Johnson",
      status: "upcoming",
    }
  ],
  symptoms: [],
  paymentMethod: {
    bank: "",
    cardNumber: "",
  },
  selectedDate: null,
  selectedTimeSlot: "",
  loading: false,
  error: null,
};
   
const appointmentSlice = createSlice({
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

  // Async actions
  extraReducers: (builder) => {
    builder
      // ---- Fetch Appointments ----
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- Create Appointment ----
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



// Actions
export const {
  setAppointments,
  setSymptoms,
  setPaymentMethod,
  setSelectedDate,
  setSelectedTimeSlot,
} = appointmentSlice.actions;

// Selectors
export const selectAppointments = (state) => state.appointment.appointments;
export const selectSymptoms = (state) => state.appointment.symptoms;
export const selectPaymentMethod = (state) => state.appointment.paymentMethod;
export const selectSelectedDate = (state) => state.appointment.selectedDate;
export const selectSelectedTimeSlot = (state) => state.appointment.selectedTimeSlot;
export const selectLoading = (state) => state.appointment.loading;
export const selectError = (state) => state.appointment.error;

// Reducer
export default appointmentSlice.reducer;