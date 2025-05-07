import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function MoodChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/mood/my-moods', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      // Simplify data for chart
      const chartData = res.data.map(entry => ({
        mood: entry.mood,
        stress: Number(entry.stressLevel),
        date: new Date(entry.createdAt).toLocaleDateString()
      }));
      setData(chartData.reverse()); // Optional: latest first
    });
  }, []);

  return (
    <div>
      <h3>Mood Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="stress" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;
