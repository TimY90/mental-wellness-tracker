import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MoodForm from './pages/MoodForm';
import MoodHistory from './pages/MoodHistory';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Mental Wellness Tracker</h1>
        <Navbar /> {/* ✅ Add this */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/log-mood" element={<MoodForm />} />
          <Route path="/history" element={<MoodHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
