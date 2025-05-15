import React, { createContext, useState, useEffect } from 'react';

export const KegiatanContext = createContext();

export const KegiatanProvider = ({ children }) => {
  const [kegiatan, setKegiatan] = useState([]);
  const [statistikData, setStatistikData] = useState([]); // Inisialisasi dengan array kosong

  // Tambah kegiatan
  const addKegiatan = (data) => {
    setKegiatan(prev => [...prev, data]);
  };

  // Update statistik setiap kali kegiatan berubah
  useEffect(() => {
    // Contoh statistik: jumlah kegiatan per status
    const statistik = [
      {
        label: 'Sedang Berlangsung',
        value: kegiatan.filter(k => k.status === 'Sedang Berlangsung').length,
      },
      {
        label: 'Selesai',
        value: kegiatan.filter(k => k.status === 'Selesai').length,
      },
    ];
    setStatistikData(statistik);
  }, [kegiatan]);

  // Nanti bisa tambah: editKegiatan, deleteKegiatan

  return (
    <KegiatanContext.Provider value={{ kegiatan, addKegiatan, statistikData }}>
      {children}
    </KegiatanContext.Provider>
  );
};
