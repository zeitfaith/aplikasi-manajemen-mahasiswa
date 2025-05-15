import React from 'react';

const StatistikSummary = ({ data }) => {
  // Pastikan data adalah array, jika tidak tampilkan pesan
  if (!Array.isArray(data) || data.length === 0) {
    return <p>Belum ada data statistik.</p>;
  }

  return (
    <div>
      <h2>Statistik Kegiatan</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.label}: {item.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default StatistikSummary;
