import React, { useContext } from "react";
import KegiatanList from "../components/Kegiatan/KegiatanList";
import KegiatanForm from "../components/Kegiatan/KegiatanForm";
import KegiatanCalendar from "../components/Kegiatan/KegiatanCalendar";
import { KegiatanContext } from "../contexts/KegiatanContext";

const Dashboard = () => {
  const { addKegiatan } = useContext(KegiatanContext);

  return (
    <div className="fade-in">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1>Manajemen Kegiatan</h1>
          <p className="dashboard-subtitle">
            Tambahkan, kelola, dan pantau semua kegiatan mahasiswa Anda dengan
            mudah dan efisien.
          </p>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-main-left">
            <KegiatanForm onSave={addKegiatan} />
            <KegiatanList />
          </div>
          <div className="dashboard-main-right">
            <KegiatanCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
