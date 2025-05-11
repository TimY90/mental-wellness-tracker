import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Mood submission form component
function MoodForm() {
  // State for form fields
  const [form, setForm] = useState({
    mood: '',
    stressLevel: '',
    note: ''
  });

  const navigate = useNavigate();

  // Handle input field updates
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/mood/add`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Mood saved!');
      setForm({ mood: '', stressLevel: '', note: '' });

      navigate('/mood-history'); // Redirect after successful submission
    } catch (err) {
      console.error('Error saving mood:', err.response?.data || err.message);
      alert('Failed to save mood.');
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Mood Logging Form">
      <h2>Log Your Mood</h2>

      {/* Mood field with accessible label */}
      <label htmlFor="mood">Mood (e.g. Happy, Anxious):</label><br />
      <input
        id="mood"
        type="text"
        name="mood"
        value={form.mood}
        onChange={handleChange}
        required
      /><br />

      {/* Stress level input with label and constraints */}
      <label htmlFor="stressLevel">Stress Level (1–10):</label><br />
      <input
        id="stressLevel"
        type="number"
        name="stressLevel"
        value={form.stressLevel}
        onChange={handleChange}
        min="1"
        max="10"
        required
      /><br />

      {/* Optional note field with label */}
      <label htmlFor="note">Optional Notes:</label><br />
      <textarea
        id="note"
        name="note"
        value={form.note}
        onChange={handleChange}
        rows="4"
        cols="40"
      /><br />

      {/* Submit button */}
      <button type="submit">Save Mood</button>
    </form>
  );
}

export default MoodForm;