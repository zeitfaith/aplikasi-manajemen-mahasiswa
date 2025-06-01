import React, { useContext, useMemo } from "react";
import StatistikSummary from "../components/Statistik/StatistikSummary";
import StatistikChart from "../components/Statistik/StatistikChart";
import { KegiatanContext } from "../contexts/KegiatanContext";

const Statistik = () => {
  const { kegiatan } = useContext(KegiatanContext);

  // Hitung statistik berdasarkan kegiatan list
  const statistikData = useMemo(() => {
    const stats = {
      "Sedang Berlangsung": 0,
      "Akan Datang": 0,
      Selesai: 0,
    };

    const now = new Date();

    kegiatan.forEach((item) => {
      // Gabungkan tanggal dan jam mulai/selesai jadi Date object
      const mulai = new Date(`${item.tanggal}T${item.jam_mulai || "00:00"}`);
      const selesai = new Date(
        `${item.tanggal}T${item.jam_selesai || "23:59"}`
      );

      if (now < mulai) {
        stats["Akan Datang"] += 1;
      } else if (now >= mulai && now <= selesai) {
        stats["Sedang Berlangsung"] += 1;
      } else {
        stats["Selesai"] += 1;
      }
    });

    // Bentuk array untuk StatistikSummary
    return [
      { label: "Sedang Berlangsung", value: stats["Sedang Berlangsung"] },
      { label: "Akan Datang", value: stats["Akan Datang"] },
      { label: "Selesai", value: stats["Selesai"] },
    ];
  }, [kegiatan]);

  return (
    <div className="fade-in">
      <h1 className="statistik-title">Statistik</h1>
      <div className="statistik-summary-card">
        <StatistikSummary data={statistikData} />
      </div>
      <div className="statistik-chart-card">
        <StatistikChart data={statistikData} />
      </div>
    </div>
  );
};

export default Statistik;
