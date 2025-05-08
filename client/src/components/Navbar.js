import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS (can be replaced with './Navbar.css' if modularized)

function Navbar() {
  const navigate = useNavigate();

  // Determine if user is logged in based on presence of token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  // State to control mobile menu toggle (open/close)
  const [isOpen, setIsOpen] = useState(false);

  // Handle logout: remove token, alert, redirect
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Hamburger icon for mobile */}
      <div className="burger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation links (hidden by default on mobile) */}
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        {/* Main links always shown */}
        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/log-mood" className="nav-link" onClick={() => setIsOpen(false)}>Log Mood</Link>
        <Link to="/mood-history" className="nav-link" onClick={() => setIsOpen(false)}>Mood History</Link>
        <Link to="/chart" className="nav-link" onClick={() => setIsOpen(false)}>Mood Chart</Link>

        {/* Conditional links based on login status */}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="nav-link" onClick={() => setIsOpen(false)}>Register</Link>
          </>
        ) : (
          <button
            className="nav-link"
            onClick={() => {
              handleLogout();
              setIsOpen(false); // Close menu on logout
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
