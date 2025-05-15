// features/profile/editPatientProfile/editPatientProfileAPI.js
import axios from 'axios';

export const editPatientProfileAPI = async (formData) => {
  const response = await axios.put('/api/patient/profile', formData); // Update URL if needed
  return response.data;
};
