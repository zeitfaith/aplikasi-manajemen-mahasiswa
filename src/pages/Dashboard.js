import React, { useContext } from 'react';
import KegiatanList from '../components/Kegiatan/KegiatanList';
import KegiatanForm from '../components/Kegiatan/KegiatanForm';
import { KegiatanContext } from '../contexts/KegiatanContext';

const Dashboard = () => {
  const { addKegiatan } = useContext(KegiatanContext);
  
  return (
    <div>
      <h1>Dashboard</h1>
      <KegiatanForm onSave={addKegiatan} />
      <KegiatanList />
    </div>
  );
};

export default Dashboard;
