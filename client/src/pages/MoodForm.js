import React, { useState } from 'react';
import axios from 'axios';

function MoodForm() {
  const [form, setForm] = useState({
    mood: '',
    stressLevel: '',
    note: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in first.');
  
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/mood/add`, form, {
          headers: {
          Authorization: `Bearer ${token}` // ✅ This is the critical fix
        }
      });
      alert('Mood saved!');
      setForm({ mood: '', stressLevel: '', note: '' });
    } catch (err) {
      console.error("❌ Error saving mood:", err.response?.data || err.message);
      alert('Failed to save mood.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Your Mood</h2>
      <input
        type="text"
        name="mood"
        placeholder="Mood (e.g. Happy, Anxious)"
        value={form.mood}
        onChange={handleChange}
        required
      /><br />
      <input
        type="number"
        name="stressLevel"
        placeholder="Stress Level (1–10)"
        value={form.stressLevel}
        onChange={handleChange}
        required
      /><br />
      <textarea
        name="note"
        placeholder="Optional notes"
        value={form.note}
        onChange={handleChange}
      /><br />
      <button type="submit">Save Mood</button>
    </form>
  );
}

export default MoodForm;
