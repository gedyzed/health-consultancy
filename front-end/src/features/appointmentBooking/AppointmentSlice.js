import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAppointments, postAppointment } from "./appointmentAPI";

export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      return await getAppointments();
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch appointments");
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (newAppointment, { rejectWithValue }) => {
    try {
      return await postAppointment(newAppointment);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create appointment");
    }
  }
);

const initialState = {
  appointments: [],
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
  extraReducers: (builder) => {
    builder
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

export const {
  setAppointments,
  setSymptoms,
  setPaymentMethod,
  setSelectedDate,
  setSelectedTimeSlot,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
export const selectAppointments = (state) => state.appointment.appointments;