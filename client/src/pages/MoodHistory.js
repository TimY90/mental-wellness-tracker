import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MoodHistory() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please log in first.');

      try {
        const res = await axios.get('http://localhost:5000/api/mood/my-moods', {
          headers: { Authorization: token }
        });
        setMoods(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load mood history.');
      }
    };

    fetchMoods();
  }, []);

  return (
    <div>
      <h2>Your Mood History</h2>
      {moods.length === 0 && <p>No mood entries yet.</p>}
      {moods.map((entry, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <strong>Mood:</strong> {entry.mood}<br />
          <strong>Stress Level:</strong> {entry.stressLevel}<br />
          <strong>Date:</strong> {new Date(entry.date).toLocaleString()}<br />
          {entry.note && <em>Note: {entry.note}</em>}
        </div>
      ))}
    </div>
  );
}

export default MoodHistory;
