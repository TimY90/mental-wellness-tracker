import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1: Import

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // ✅ Step 2: Initialize navigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/log-mood'); // ✅ Step 3: Redirect after success
    } catch (err) {
      console.error(err);
      alert('Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      /><br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      /><br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
