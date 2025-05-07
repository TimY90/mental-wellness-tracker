import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", form); //To see the information in the console when inspected
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);

      alert('User registered! You can now log in.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Registration failed: ${err.response.data.message}`);
      } else {
        alert('Registration failed. Please try again.');
      }
      console.error("Registration error:", err.response?.data || err.message);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} pattern=".{6,}" title="Password must be at least 6 characters" required /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
