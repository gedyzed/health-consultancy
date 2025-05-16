import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        Id: "",
        pp: "",
        name:"",
        title: [],
        payment: "",
        nonAvailableTime: {},
        selectedDate: "",
        cardNumber: "",
        currBank: "",
        symptoms: "",
        yearOfExperience:"",
        doctors:[],
        time:"",
    },

    reducers: {
        setId: (state, action) => {
            state.Id = action.payload;
        },
        setTime: (state) => {
          state.time = now.toTimeString.split(' ')[0]
        },
        setName: (state, action) => {
          state.name = action.payload
        },
        setPp: (state, action) => {
            state.pp = action.payload;
        },
        setTitle: (state, action) => {
            state.title.push(action.payload);
        },
        setPayment: (state, action) => {
            state.payment = action.payload;
        },
        setNonAvailableTime: (state, action) => {
            const { date, time } = action.payload;
            if (!state.nonAvailableTime[date]) {
                state.nonAvailableTime[date] = [];
            }
            state.nonAvailableTime[date].push(time);
        },
        setYearOfExperience: (state, action) => {
            state.yearOfExperience = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setCardNumber: (state, action) => {
            state.cardNumber = action.payload;
        },
        setCurrBank: (state, action) => {
            state.currBank = action.payload;
        },
        setSymptoms: (state, action) => {
            state.symptoms = action.payload;
        },
        setDoctors: (state, action) => {
          state.doctors = action.payload;
        },
        resetBooking: (state) => {
            // Reset to initial state
            state.Id = "";
            state.pp = "";
            state.title = "";
            state.payment = "";
            state.nonAvailableTime = {};
            state.rating = "";
            state.selectedDate = "";
            state.cardNumber = "";
            state.currBank = "";
            state.symptoms = "";
        }
    }
}); 

export const {
    setId,
    setPp,
    setTitle,
    setPayment,
    setNonAvailableTime,
    setRating,
    setSelectedDate,
    setCardNumber,
    setCurrBank,
    setSymptoms,
    resetBooking,
    setDoctors,
    setName,

} = bookingSlice.actions;

export default bookingSlice.reducer;


export const fetchDoctorById = createAsyncThunk(
  'doctor/fetchDoctorById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/doctor/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProfileById = createAsyncThunk(
  'doctor/fetchProfileById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`doctor/getProfileById/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSpecializedDoctors = createAsyncThunk(
  'doctor/fetchSpecializedDoctors',
  async (specializationName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/specialization/${specializationName}/doctorsList`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchAppointmentsByDoctorId = createAsyncThunk(
  'appointments/fetchUpcomingAppointmentsByDoctorId',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/doctor/${doctorId}/upcomingAppointments`);
      return response.data.data; // because Laravel returns {status, data}
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);







