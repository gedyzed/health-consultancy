import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDoctorDashboardSummaryAPI } from "./doctorDashboardAPI";

export const fetchDoctorDashboardSummary = createAsyncThunk(
  "doctorDashboard/fetchSummary",
  async (_, thunkAPI) => {
    try {
      const response = await fetchDoctorDashboardSummaryAPI();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const doctorDashboardSlice = createSlice({
  name: "doctorDashboard",
  initialState: {
    totalAppointments: 0,
    todaysAppointments: 0,
    totalRevenue: 0,
    averageRating: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.totalAppointments = action.payload.totalAppointments;
        state.todaysAppointments = action.payload.todaysAppointments;
        state.totalRevenue = action.payload.totalRevenue;
        state.averageRating = action.payload.averageRating;
      })
      .addCase(fetchDoctorDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorDashboardSlice.reducer;
