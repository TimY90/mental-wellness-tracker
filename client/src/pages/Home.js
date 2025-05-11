import React from 'react';
import { useNavigate } from 'react-router-dom';
import Quote from "../components/Quote";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {/* Welcome heading */}
      <h1>Welcome to the Mental Wellness Tracker</h1>

      {/* Purpose of the app */}
      <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '1.1rem' }}>
        This app is designed to help you reflect on your emotional well-being by tracking your moods and stress levels over time. 
        Mental wellness is an important part of life, and self-awareness can be a powerful step toward improvement.
      </p>

      {/* Navigation buttons */}
      <button onClick={() => navigate('/register')} style={{ margin: '1rem' }}>
        Register
      </button>
      <button onClick={() => navigate('/login')} style={{ margin: '1rem' }}>
        Login
      </button>
      <button onClick={() => navigate('/chart')} style={{ margin: '1rem' }}>
        View Mood Chart
      </button>

      {/* Motivational Quote Section */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Daily Motivation</h3>
        <Quote />
      </div>
    </div>
  );
}

export default Home;
