import React, { useContext } from 'react';
import StatistikSummary from '../components/Statistik/StatistikSummary';
import StatistikChart from '../components/Statistik/StatistikChart';
import { KegiatanContext } from '../contexts/KegiatanContext';

const Statistik = () => {
  const { statistikData } = useContext(KegiatanContext);

  return (
    <div className="fade-in">
      <h1 className="statistik-title">Statistik</h1>
      <div className="statistik-summary-card">
        <StatistikSummary data={statistikData || []} />
      </div>
      <div className="statistik-chart-card">
        <StatistikChart data={statistikData || []} />
      </div>
    </div>
  );
};

export default Statistik;
