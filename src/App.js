import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const App = () => {
  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/data');
      const data = response.data;

      const labels = data.map(item => item.your_label_column);
      const values = data.map(item => item.your_value_column);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Your Data Label',
            data: values,
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from PostgreSQL</h1>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default App;
