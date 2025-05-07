import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MoodForm from './pages/MoodForm';
import MoodHistory from './pages/MoodHistory';
import Navbar from './components/Navbar';
import './App.css';
import MoodChart from './components/MoodChart';

function App() {
  return (
    <Router>
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
