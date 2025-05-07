import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing all the individual page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MoodForm from './pages/MoodForm';
import MoodHistory from './pages/MoodHistory';
import MoodChart from './components/MoodChart';
import Navbar from './components/Navbar'; // Navigation bar to be shown on all pages

// Global styles
import './App.css';

// Root component that defines client-side routing using React Router
function App() {
  return (
    <Router>
      {/* Navbar will be shown on all routes */}
      <Navbar />
      <Routes>
        {/* Route configuration for each page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/log-mood" element={<MoodForm />} />
        <Route path="/chart" element={<MoodChart />} />
        <Route path="/mood-history" element={<MoodHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
