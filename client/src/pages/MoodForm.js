import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection after form submission

// MoodForm component allows users to log their mood, stress level, and notes
function MoodForm() {
  const [form, setForm] = useState({
    mood: '',
    stressLevel: '',
    note: ''
  });

  const navigate = useNavigate(); // Hook for redirecting to mood history

  // Handle changes to form inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from local storage to authorize request
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in first.');

    try {
      console.log("Token being sent:", token); // Debug log

      // Submit mood data to backend
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/mood/add`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Mood saved!');
      setForm({ mood: '', stressLevel: '', note: '' }); // Clear form
      navigate('/mood-history'); // Redirect user to mood history
    } catch (err) {
      console.error("Error saving mood:", err.response?.data || err.message);
      alert('Failed to save mood.');
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Mood Logging Form">
      <h2>Log Your Mood</h2>

      {/* Mood input */}
      <label htmlFor="mood">Mood</label><br />
      <input
        id="mood"
        type="text"
        name="mood"
        placeholder="Mood (e.g. Happy, Anxious)"
        value={form.mood}
        onChange={handleChange}
        required
        aria-required="true"
      /><br />

      {/* Stress level input */}
      <label htmlFor="stressLevel">Stress Level (1–10)</label><br />
      <input
        id="stressLevel"
        type="number"
        name="stressLevel"
        placeholder="Stress Level"
        value={form.stressLevel}
        onChange={handleChange}
        required
        min="1"
        max="10"
        aria-required="true"
      /><br />

      {/* Optional note */}
      <label htmlFor="note">Optional Notes</label><br />
      <textarea
        id="note"
        name="note"
        placeholder="How are you feeling today?"
        value={form.note}
        onChange={handleChange}
      /><br />

      {/* Submit button */}
      <button type="submit">Save Mood</button>
    </form>
  );
}

export default MoodForm;
