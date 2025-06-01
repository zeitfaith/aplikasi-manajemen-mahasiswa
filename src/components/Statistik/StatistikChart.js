import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatistikChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Jumlah Kegiatan',
        data: data.map(item => item.value),
        backgroundColor: [
          '#4ecdc4', '#f7b32b', '#2a3d66', '#e63946'
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Grafik Statistik Kegiatan' },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StatistikChart;
