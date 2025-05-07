// Imports the React library and the hook for navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Functional component representing the Home page
function Home() {
  // Initializes the navigation hook from React Router
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {/* Page title and description */}
      <h1>Mental Wellness Tracker</h1>
      <p>Track your moods, manage your stress, and reflect on your wellness journey.</p>

      {/* Navigation buttons that redirect the user to various pages */}
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
