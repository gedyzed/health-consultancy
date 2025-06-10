import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Include your auth token for protected routes
// const getAuthConfig = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust if stored elsewhere
//   },
// });

export const postAppointment = async (data) => {
  const response = await axios.post(`${BASE_URL}/setAppointment`, data);
  return response.data;
};

export const getAppointmentsByPatient = async (patientId) => {
  const response = await axios.get(`${BASE_URL}/appointment/patient/${patientId}`);
  return response.data;
};

export const getAppointmentSuccess = async (id) => {
  const response = await axios.get(`${BASE_URL}/appointments/success/${id}`);
  return response.data;
};

export const getUpcomingAppointmentsByDoctor = async (doctorId) => {
  const response = await axios.get(`${BASE_URL}/doctor/${doctorId}/UpcomingAppointments`);
  return response.data;
};

export const getClosedAppointmentsByDoctor = async (doctorId) => {
  const response = await axios.get(`${BASE_URL}/doctor/${doctorId}/closedAppointment`);
  return response.data;
};

export const getUpcomingAppointmentsByPatient = async (patientId) => {
  const response = await axios.get(`${BASE_URL}/patient/${patientId}/upcommingAppointments`);
  return response.data;
};
