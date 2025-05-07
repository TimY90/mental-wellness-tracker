import React from 'react';
import { useNavigate } from 'react-router-dom'; // Used for programmatic navigation

function Home() {
  const navigate = useNavigate(); // Hook to allow navigation on button click

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {/* Main heading for the landing page */}
      <h1>Mental Wellness Tracker</h1>

      {/* Introductory text for the application */}
      <p>Track your moods, manage your stress, and reflect on your wellness journey.</p>

      {/* Button to navigate to the Register page */}
      <button onClick={() => navigate('/register')} style={{ margin: '1rem' }}>
        Register
      </button>

      {/* Button to navigate to the Login page */}
      <button onClick={() => navigate('/login')} style={{ margin: '1rem' }}>
        Login
      </button>

      {/* Button to navigate to the Mood Chart page */}
      <button onClick={() => navigate('/chart')} style={{ margin: '1rem' }}>
        View Mood Chart
      </button>
    </div>
  );
}

export default Home;
