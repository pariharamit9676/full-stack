import api from './axios';

// Get user profile
export const getUserProfile = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userId, userData, token) => {
  const response = await api.put(`/users/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
