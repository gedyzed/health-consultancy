import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/patient/appointments";

export const fetchPatientAppointments = createAsyncThunk(
    "appointment/fetchPatientAppointments",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(API_URL);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || "Failed to fetch appointments");
      }
    }
  );


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
