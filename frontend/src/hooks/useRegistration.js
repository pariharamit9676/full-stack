// src/hooks/useRegisterForm.js
import { useState } from 'react';
import axios from 'axios';

const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true,
      });
      setSuccess('✅ Registration successful.');
      setFormData({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
      });
    } catch (err) {
      setError(err.response?.data?.error || '❌ Something went wrong');
    }
  };

  return {
    formData,
    error,
    success,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
