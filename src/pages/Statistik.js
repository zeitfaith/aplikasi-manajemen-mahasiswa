import React, { useContext } from 'react';
import StatistikSummary from '../components/Statistik/StatistikSummary';
import { KegiatanContext } from '../contexts/KegiatanContext';

const Statistik = () => {
  const { statistikData } = useContext(KegiatanContext);

  return (
    <div>
      <h1>Statistik</h1>
      <StatistikSummary data={statistikData || []} />
    </div>
  );
};

export default Statistik;
