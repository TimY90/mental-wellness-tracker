// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🧠 Mental Wellness Tracker</h1>
      <p>Track your moods, manage your stress, and reflect on your wellness journey.</p>

      <button onClick={() => navigate('/register')} style={{ margin: '1rem' }}>
        Register
      </button>

      <button onClick={() => navigate('/login')} style={{ margin: '1rem' }}>
        Login
      </button>

      <button onClick={() => navigate('/chart')} style={{ margin: '1rem' }}>
        View Mood Chart
      </button>
    </div>
  );
}

export default Home;
