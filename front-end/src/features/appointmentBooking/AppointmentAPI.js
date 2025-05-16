import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAppointments = async () => {
  const response = await axios.get(`${BASE_URL}/appointments`);
  return response.data;
};

export const postAppointment = async (appointmentData) => {
  const response = await axios.post(API_URL, appointmentData);
  return response.data;
};
