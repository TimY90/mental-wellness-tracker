import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Dynamically set API base URL depending on local or production
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://mental-wellness-tracker-r6kn.onrender.com';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Update state as user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit credentials to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/log-mood');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      alert(`Login failed: ${msg}`);
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Login Form">
      <h2>Login</h2>

      {/* Email input with accessible label */}
      <label htmlFor="email">Email:</label><br />
      <input
        id="email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      /><br />

      {/* Password input with accessible label */}
      <label htmlFor="password">Password:</label><br />
      <input
        id="password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      /><br />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
