// doctorProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:8000/api";

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