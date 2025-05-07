import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Dynamically determines the API base URL depending on whether the app is running locally or in production
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://mental-wellness-tracker-r6kn.onrender.com';

function Register() {
  // useState hooks to store form input values and submission loading state
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Hook to navigate to different routes after successful registration
  const navigate = useNavigate();

  // Updates form state when any of the input fields change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submits registration form data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form reload behavior
    setLoading(true);   // Sets loading state to true during async operation

    try {
      // Sends POST request to register a new user
      await axios.post(`${API_BASE_URL}/api/auth/register`, form);
      alert('User registered! You can now log in.');
      navigate('/login'); // Redirects user to login page
    } catch (err) {
      // Handles and logs any error returned by the server or network
      const msg = err?.response?.data?.message || err.message;
      alert(`Registration failed: ${msg}`);
    } finally {
      setLoading(false); // Resets loading state
    }
  };

  return (
    // Section provides a labeled region for screen readers
    <section aria-labelledby="register-heading">
      <h2 id="register-heading">Register</h2>
      {/* Accessible form with descriptive text for screen readers */}
      <form onSubmit={handleSubmit} aria-describedby="register-desc">
        <p id="register-desc">Create a new account by filling out the form below.</p>

        {/* Grouping related fields using a fieldset for semantics */}
        <fieldset>
          <legend>User Information</legend>

          {/* Name input field */}
          <label htmlFor="name">Name</label><br />
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            aria-required="true"
          /><br />

          {/* Email input field */}
          <label htmlFor="email">Email</label><br />
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            aria-required="true"
          /><br />

          {/* Password input field with basic strength enforcement */}
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Password must contain at least 6 characters, including uppercase, lowercase, and a number."
            required
            aria-required="true"
          /><br />
        </fieldset>

        {/* Submit button with loading state and accessibility attributes */}
        <button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </section>
  );
}

export default Register;
