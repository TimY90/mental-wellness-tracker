import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function MoodChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/mood/my-moods`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const chartData = res.data.map(entry => ({
          mood: entry.mood,
          stress: Number(entry.stressLevel),
          date: new Date(entry.createdAt).toLocaleDateString()
        }));

        setData(chartData.reverse()); // Optional: latest first
      } catch (err) {
        console.error('Error fetching mood data:', err.response?.data || err.message);
      }
    };

    fetchData(); // 🔁 call the async function
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
