import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MoodHistory() {
  // State to store mood entries fetched from the server
  const [moods, setMoods] = useState([]);

  // Fetch the user's mood history when the component mounts
  useEffect(() => {
    const fetchMoods = async () => {
      // Get the JWT token from localStorage for authentication
      const token = localStorage.getItem('token');

      // If no token is found, prompt the user to log in
      if (!token) {
        alert('Please log in to view your mood history.');
        return;
      }

      try {
        // Make a GET request to the backend API with the token
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/mood/my-moods`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach token for protected route
          }
        });

        // Update the moods state with the data from the response
        setMoods(res.data);
      } catch (err) {
        // Handle API or network errors
        console.error('Error fetching moods:', err.response?.data || err.message);
        alert('Failed to fetch mood history.');
      }
    };

    // Call the async function to fetch data
    fetchMoods();
  }, []);

  return (
    <div>
      {/* Heading with accessibility support */}
      <h2 tabIndex="0">Your Mood History</h2>

      {/* Conditional display depending on whether moods exist */}
      {moods.length === 0 ? (
        <p tabIndex="0">No mood entries yet. Log a mood to get started.</p>
      ) : (
        <ul aria-label="Mood history list">
          {/* Loop through each mood entry and display it */}
          {moods.map((entry, index) => (
            <li key={index} tabIndex="0">
              <strong>{entry.mood}</strong> (Stress: {entry.stressLevel}) - {entry.note || 'No note'}
              <br />
              <small>
                {/* Display formatted creation date, or fallback if unavailable */}
                {entry.createdAt
                  ? new Date(entry.createdAt).toLocaleString()
                  : 'Date not available'}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoodHistory;
