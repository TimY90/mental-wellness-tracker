// Imports React and necessary hooks for state and lifecycle
import React, { useEffect, useState } from 'react';
// Imports Axios for API requests
import axios from 'axios';
// Imports chart components from Recharts
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts';

// Functional component to render a mood trend chart
function MoodChart() {
  // Initializes state to hold mood data for the chart
  const [data, setData] = useState([]);

  // Runs once on component mount to fetch mood data from backend
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieves token for authentication

      try {
        // Sends a GET request to retrieve the user's mood data
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/mood/my-moods`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Transforms the data into a format suitable for the chart
        const chartData = res.data.map(entry => ({
          mood: entry.mood,
          stress: Number(entry.stressLevel),
          date: new Date(entry.createdAt).toLocaleDateString()
        }));

        // Reverses the array so the latest entries appear last in the chart
        setData(chartData.reverse());
      } catch (err) {
        console.error('Error fetching mood data:', err.response?.data || err.message);
      }
    };

    // Invokes the data fetching function
    fetchData();
  }, []);

  // Renders the line chart inside a responsive container
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
