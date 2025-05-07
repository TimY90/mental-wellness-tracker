import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This component renders a navigation bar with links to various routes in the application
function Navbar() {
  const navigate = useNavigate();

  // Checks if a user is logged in by verifying if a token exists in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  // Handles user logout by removing the token and redirecting to the login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
    navigate('/login');
  };

  // Returns a styled navigation bar with conditional rendering based on login status
  return (
    <nav style={{
      marginBottom: '20px',
      background: '#f0f0f0',
      padding: '10px',
      borderBottom: '1px solid #ccc'
    }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/log-mood" style={{ marginRight: '15px' }}>Log Mood</Link>
      <Link to="/mood-history" style={{ marginRight: '15px' }}>Mood History</Link>
      <Link to="/chart" style={{ marginRight: '15px' }}>Mood Chart</Link>

      {/* Shows login/register links if not logged in, otherwise shows logout button */}
      {!isLoggedIn ? (
        <>
          <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
