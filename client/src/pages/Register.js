import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Dynamically choose backend API URL based on environment
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://mental-wellness-tracker-r6kn.onrender.com';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update form state when user types in an input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission and call API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, form);
      alert('User registered! You can now log in.');
      navigate('/login');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      alert(`Registration failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Registration Form">
      <h2>Register</h2>

      {/* Name input with label for accessibility */}
      <label htmlFor="name">Name:</label><br />
      <input
        id="name"
        type="text"
        name="name"
        onChange={handleChange}
        required
      /><br />

      {/* Email input with label */}
      <label htmlFor="email">Email:</label><br />
      <input
        id="email"
        type="email"
        name="email"
        onChange={handleChange}
        required
      /><br />

      {/* Password input with label */}
      <label htmlFor="password">Password:</label><br />
      <input
        id="password"
        type="password"
        name="password"
        onChange={handleChange}
        pattern=".{6,}"
        title="Password must be at least 6 characters"
        required
      /><br />

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

export default Register;
