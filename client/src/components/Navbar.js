import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/log-mood" style={{ marginRight: '15px' }}>Log Mood</Link>
      <Link to="/history" style={{ marginRight: '15px' }}>Mood History</Link>
      <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
      <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
