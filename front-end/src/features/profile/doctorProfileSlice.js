import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const submitDoctorProfile = createAsyncThunk(
  'doctorProfile/submit',
  async (form, thunkAPI) => {
    const navigate = useNavigate()

    try {
      const formData = new FormData();

      // Basic fields
      formData.append('fullName', form.name);
      formData.append('doctor_id', form.doctorId);
      // formData.append('image', form.profileImage);      
      // formData.append('idImage', form.idImage);      
      formData.append('aboutMe', form.about);
      formData.append('pricing', form.rate);
      formData.append('yearOfExperience', form.experience);

      // Languages
      form.languages?.forEach((lang, index) =>
        formData.append(`languages[${index}]`, lang)
      );

      // Specializations
      form.specializations?.forEach((spec, index) =>
        formData.append(`specializations[${index}]`, spec)
      );

      // Education
      form.educationList?.forEach((edu, index) => {
        formData.append(`education[${index}][degree]`, edu.degree);
        formData.append(`education[${index}][fieldOfStudy]`, edu.fieldOfStudy ?? 'General');
        formData.append(`education[${index}][institution]`, edu.institution);
        formData.append(`education[${index}][endYear]`, edu.year);
      });

      // Certifications (each must be a file)
      form.certifications?.forEach((cert, index) =>
        formData.append(`certifications[${index}]`, cert)
      );

      // Debug log
      console.log("Submitting doctor profile...");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Send request
      const response = await axios.post(`${BASE_URL}/doctor/setprofile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("+++++++++finish");
      console.log(response.status, response.data);
      navigate("/profile")
      return response.data;

    } catch (error) {
      console.log("errorrrrrrrrrr", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong'
      );
    }
  }
);



const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearProfileState: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDoctorProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitDoctorProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(submitDoctorProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;
