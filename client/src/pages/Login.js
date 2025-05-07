import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Dynamically set API URL depending on environment
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://mental-wellness-tracker-r6kn.onrender.com';

// Login component for authenticating users
function Login() {
  const [form, setForm] = useState({ email: '', password: '' }); // State for form input
  const navigate = useNavigate(); // Navigation hook for redirecting after login

  // Handle input changes and update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to login endpoint
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form);

      // Store JWT token in local storage
      localStorage.setItem('token', res.data.token);

      alert('Login successful!');
      navigate('/log-mood'); // Redirect to mood form page
    } catch (err) {
      // Display error to user if login fails
      const msg = err?.response?.data?.message || err.message;
      alert(`Login failed: ${msg}`);
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Login Form">
      <h2>Login</h2>

      {/* Email field */}
      <label htmlFor="email">Email Address</label><br />
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        aria-required="true"
      /><br />

      {/* Password field */}
      <label htmlFor="password">Password</label><br />
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        aria-required="true"
      /><br />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
