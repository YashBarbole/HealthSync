import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

const AdminLogin = () => {
  const { login } = useContext(AdminContext); // Use login function from AdminContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password); // Let the context handle authentication
      navigate("/admindashboard/adminhomepage");
    } catch (error) {
      setError("Login failed, please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/adminregister"); // Navigate to the /register route when button is clicked
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Display error message if any */}
        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}

        {/* Display message */}
        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}

        {/* Register option */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <p
            onClick={handleRegister}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register here
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
