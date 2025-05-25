import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';  // make sure path is correct

const LoginPage = () => {
  const { login } = useUser(); // login function from context
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData,
        { withCredentials: true }
      );

      const userData = response.data.user; // backend should return user data here
      login(userData); // update user context with current user
      navigate('/');   // redirect to home page or dashboard
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || '❌ Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">Login</h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 transition text-white rounded-md font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
