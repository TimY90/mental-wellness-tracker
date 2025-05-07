import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MoodHistory() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Please log in to view your mood history.');

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/mood/my-moods`, {

          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMoods(res.data);
      } catch (err) {
        console.error('❌ Error fetching moods:', err.response?.data || err.message);
        alert('Failed to fetch mood history.');
      }
    };

    fetchMoods();
  }, []);

  return (
    <div>
      <h2>Your Mood History</h2>
      <ul>
        {moods.map((entry, index) => (
          <li key={index}>
            <strong>{entry.mood}</strong> (Stress: {entry.stressLevel}) - {entry.note} <br />
            <small>
              {entry.createdAt
                ? new Date(entry.createdAt).toLocaleString()
                : 'Date not available'}
            </small>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodHistory;
