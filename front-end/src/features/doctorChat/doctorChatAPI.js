import axios from 'axios';

export const fetchDoctorMessages = async (doctorId) => {
  const response = await axios.get(`/api/chat/messages/${doctorId}`);
  return response.data; // Expected: Array of message objects
};
