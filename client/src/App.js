import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MoodForm from './pages/MoodForm';
import MoodHistory from './pages/MoodHistory';

// Importing shared components
import MoodChart from './components/MoodChart';
import Navbar from './components/Navbar'; // Top navigation bar

// Importing global styles
import './App.css';

function App() {
  return (
    <Router>
      {/* Navbar is included at the top of all pages */}
      <Navbar />

      {/* Routing configuration for different pages */}
      <Routes>
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
