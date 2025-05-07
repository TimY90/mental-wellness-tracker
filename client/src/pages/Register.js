import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ For redirect

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", form);
    setLoading(true); // ✅ Start loading

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, form);
      alert('User registered! You can now log in.');
      navigate('/login'); // ✅ Redirect to login page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Registration failed: ${err.response.data.message}`);
      } else {
        alert('Registration failed. Please try again.');
      }
      console.error("Registration error:", err.response?.data || err.message);
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
      <input
        type="password"
        name="password"
        placeholder="Password"
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
