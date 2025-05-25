import useRegisterForm from "../hooks/useRegistration";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { formData, error, success, handleChange, handleSubmit } =
    useRegisterForm();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Create an Account
        </h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isAdmin" className="text-sm text-gray-700">
                Register as Admin
              </label>
            </div>
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
            >
              Go to Login
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 transition text-white rounded-md font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
