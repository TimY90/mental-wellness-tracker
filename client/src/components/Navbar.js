// Imports React and hooks for navigation and linking
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Functional component for the navigation bar
function Navbar() {
  const navigate = useNavigate();

  // Checks whether a user is logged in by verifying token existence
  const isLoggedIn = !!localStorage.getItem('token');

  // Handles user logout by clearing the token and redirecting to login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <nav style={{
      marginBottom: '20px',
      background: '#f0f0f0',
      padding: '10px',
      borderBottom: '1px solid #ccc'
    }}>
      {/* Always visible links */}
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/log-mood" style={{ marginRight: '15px' }}>Log Mood</Link>
      <Link to="/mood-history" style={{ marginRight: '15px' }}>Mood History</Link>
      <Link to="/chart" style={{ marginRight: '15px' }}>Mood Chart</Link>

      {/* Conditional links based on login status */}
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
