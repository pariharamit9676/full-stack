import api from './axios';

// Get all books with pagination
export const getAllBooks = async () => {
  const response = await api.get(`/books/getAllBooks`);
  return response.data;
};

// Get a specific book
export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Add a new book (admin only)
export const addBook = async (bookData) => {
  const response = await api.post('/books', bookData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const submitReview = async (bookId,reviewData) => {
  const response = await api.post(`/books/reviews/${bookId}`, reviewData);
  return response.data;
};
