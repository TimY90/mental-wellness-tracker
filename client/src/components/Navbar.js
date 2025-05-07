import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // ✅ Check if token exists

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <nav style={{
      marginBottom: '20px',
      background: '#e0f7fa',
      padding: '10px',
      borderBottom: '2px solid #00796b'
    }}>
      <h3 style={{ marginTop: 0 }}>🔷 Navbar is rendering!</h3> {/* ✅ Visual confirmation */}
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/log-mood" style={{ marginRight: '15px' }}>Log Mood</Link>
      <Link to="/mood-history" style={{ marginRight: '15px' }}>Mood History</Link>
      <Link to="/chart" style={{ marginRight: '15px' }}>Mood Chart</Link>

      {!isLoggedIn && (
        <>
          <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
        </>
      )}

      {isLoggedIn && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
