import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// This component displays a line chart of the user's mood and stress level over time
function MoodChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // When the component mounts, it fetches the user's mood data from the backend API
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/mood/my-moods`, {
          headers: {
            Authorization: `Bearer ${token}` // The token is included in the header for authentication
          }
        });

        // The returned data is transformed to include only the fields needed for the chart
        const chartData = res.data.map(entry => ({
          mood: entry.mood,
          stress: Number(entry.stressLevel), // Converts stress level to a number for charting
          date: new Date(entry.createdAt).toLocaleDateString() // Formats date for display on the x-axis
        }));

        setData(chartData.reverse()); // Optional: reverses the order to show the most recent first
      } catch (err) {
        // Any errors during the fetch are logged to the console
        console.error('Error fetching mood data:', err.response?.data || err.message);
      }
    };

    fetchData(); // Calls the asynchronous function to fetch mood data
  }, []);

  // The component renders a responsive line chart using Recharts
  return (
    <div>
      <h3>Mood Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" /> // Displays dates on the x-axis
          <YAxis domain={[0, 10]} /> // Sets the y-axis range from 0 to 10 for stress levels
          <Tooltip /> // Shows tooltip on hover
          <CartesianGrid stroke="#ccc" /> // Adds a grid to the chart
          <Line type="monotone" dataKey="stress" stroke="#8884d8" /> // Plots stress level as a line
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;
