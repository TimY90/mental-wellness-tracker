// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// This component represents the landing page of the Mental Wellness Tracker application
function Home() {
  const navigate = useNavigate(); // Hook used to programmatically navigate between routes

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {/* Application title and description */}
      <h1>Mental Wellness Tracker</h1>
      <p>Track your moods, manage your stress, and reflect on your wellness journey.</p>

      {/* Navigation buttons to key areas of the application */}
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
