import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MoodForm from './pages/MoodForm';
import MoodHistory from './pages/MoodHistory';
import MoodChart from './components/MoodChart';
import Navbar from './components/Navbar'; // ✅ Used now
import './App.css';

function App() {
  return (
    <Router>
      {/* ✅ Navbar now visible on all pages */}
      <Navbar />
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
