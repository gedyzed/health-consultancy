// doctorProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.BASE_URL;

// Async thunk to submit the doctor profile
export const submitDoctorProfile = createAsyncThunk(
  'doctorProfile/submit',
  async ({ form, doctorId }, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append('doctor_id', doctorId);
      formData.append('fullName', form.name);
      formData.append('aboutMe', form.about);
      formData.append('yearOfExperience', form.experience);
      formData.append('pricing', form.rate);
      formData.append('image', form.profileImage);
      formData.append('idImage', form.profileImage); // Assuming same for now

      // Languages
      form.languages.forEach((lang, index) =>
        formData.append(`languages[${index}]`, lang)
      );

      // Specializations
      form.specializations.forEach((spec, index) =>
        formData.append(`specializations[${index}]`, spec)
      );

      // Education
      form.educationList.forEach((edu, index) => {
        formData.append(`education[${index}][degree]`, edu.degree);
        formData.append(`education[${index}][fieldOfStudy]`, 'General'); // Default
        formData.append(`education[${index}][institution]`, edu.institution);
        formData.append(`education[${index}][endYear]`, edu.year);
      });

      // Certifications
      form.certifications.forEach((cert, index) =>
        formData.append(`certifications[${index}]`, cert)
      );

     console.log(formData.entries)
     console.log(formData)
     console.log(formData.getAll)
     console.log(formData.values)

      const response = await axios.post(
        `${BASE_URL}/doctor/setDoctorProfile`,
        formData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Something went wrong'
      );
    }
  }
);

export const fetchProfileById = createAsyncThunk(
  'doctor/fetchProfileById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/doctor/getProfileById/${id}`);
       return response.date[0];
      }
     catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.response?.data || 'Something went wrong',
        status: error.response?.status || 500
      });
    }
  }
);

