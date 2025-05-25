import api from './axios';

// Get reviews for a book
export const getReviewsByBookId = async (bookId) => {
  const response = await api.get(`/reviews?bookId=${bookId}`);
  return response.data;
};

// Submit a new review

