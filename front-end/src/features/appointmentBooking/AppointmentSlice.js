// appointmentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  postAppointment,
  getAppointmentsByPatient,
  getAppointmentSuccess,
  getUpcomingAppointmentsByDoctor,
  getClosedAppointmentsByDoctor,
  getUpcomingAppointmentsByPatient,
} from "./appointmentAPI";

const initialState = {
  appointments: [],  
  loading: false,
  error: null,
};

// 1. POST a new appointment → append to `appointments` on success
export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await postAppointment(appointmentData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to create appointment");
    }
  }
);

// 2. GET all appointments for a patient → append to `appointments`
export const fetchAppointmentsByPatient = createAsyncThunk(
  "appointment/fetchByPatient",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await getAppointmentsByPatient(patientId);
      return response; // expect an array
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch patient appointments");
    }
  }
);

// 3. GET appointment-success info by appointment ID → append single object
export const fetchAppointmentSuccess = createAsyncThunk(
  "appointment/fetchSuccess",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await getAppointmentSuccess(appointmentId);
      return response; // single object or array
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch appointment success");
    }
  }
);

// 4. GET upcoming appointments for a doctor → append array
export const fetchDoctorUpcomingAppointments = createAsyncThunk(
  "appointment/fetchDoctorUpcoming",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await getUpcomingAppointmentsByDoctor(doctorId);
      return response; // expect an array
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch doctor’s upcoming appointments");
    }
  }
);

// 5. GET closed appointments for a doctor → append array
export const fetchDoctorClosedAppointments = createAsyncThunk(
  "appointment/fetchDoctorClosed",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await getClosedAppointmentsByDoctor(doctorId);
      return response; // expect an array
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch doctor’s closed appointments");
    }
  }
);

// 6. GET upcoming appointments for a patient → append array
export const fetchPatientUpcomingAppointments = createAsyncThunk(
  "appointment/fetchPatientUpcoming",
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await getUpcomingAppointmentsByPatient(patientId);
      return response; // expect an array
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch patient’s upcoming appointments");
    }
  }
);

//
// appointmentSlice
//

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointmentError(state) {
      state.error = null;
    },
    clearAllAppointments(state) {
      state.appointments = [];
      state.loading = false;
      state.error = null;
    },
  },
extraReducers: (builder) => {
  //
  // fetchAppointmentsByPatient
  //
  builder
    .addCase(fetchAppointmentsByPatient.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAppointmentsByPatient.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        action.payload.forEach((appt) => {
          if (!state.appointments.find((a) => a.appointment_id === appt.appointment_id)) {
            state.appointments.push(appt);
          }
        });
      }
    })
    .addCase(fetchAppointmentsByPatient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  //
  // fetchDoctorUpcomingAppointments
  //
  builder
    .addCase(fetchDoctorUpcomingAppointments.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchDoctorUpcomingAppointments.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        action.payload.forEach((appt) => {
          if (!state.appointments.find((a) => a.appointment_id === appt.appointment_id)) {
            state.appointments.push(appt);
          }
        });
      }
    })
    .addCase(fetchDoctorUpcomingAppointments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  //
  // fetchDoctorClosedAppointments
  //
  builder
    .addCase(fetchDoctorClosedAppointments.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchDoctorClosedAppointments.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        action.payload.forEach((appt) => {
          if (!state.appointments.find((a) => a.appointment_id === appt.appointment_id)) {
            state.appointments.push(appt);
          }
        });
      }
    })
    .addCase(fetchDoctorClosedAppointments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  //
  // fetchPatientUpcomingAppointments
  //
  builder
    .addCase(fetchPatientUpcomingAppointments.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPatientUpcomingAppointments.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        action.payload.forEach((appt) => {
          if (!state.appointments.find((a) => a.appointment_id === appt.appointment_id)) {
            state.appointments.push(appt);
          }
        });
      }
    })
    .addCase(fetchPatientUpcomingAppointments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}

});

export const {
  clearAppointmentError,
  clearAllAppointments,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

// Selector
export const selectAppointments = (state) => state.appointment.appointments;
