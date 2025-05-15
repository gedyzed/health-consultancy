import axios from 'axios';

// Fetch chat messages between a patient and a specific doctor
export const fetchDoctorMessages = async (doctorId) => {
  const response = await axios.get(`/api/chat/messages/${doctorId}`);
  return response.data; // Expected: Array of message objects
};
