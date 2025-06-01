import React, { createContext, useState, useEffect } from 'react';

export const KegiatanContext = createContext();

export const KegiatanProvider = ({ children }) => {
  const [kegiatan, setKegiatan] = useState([]);
  const [statistikData, setStatistikData] = useState([]);

  // Tambah kegiatan baru
  const addKegiatan = (data) => {
    setKegiatan(prev => [...prev, data]);
  };

  // Edit kegiatan berdasarkan index
  const editKegiatan = (index, updated) => {
    setKegiatan(prev =>
      prev.map((item, idx) => (idx === index ? { ...item, ...updated } : item))
    );
  };

  // Hapus kegiatan berdasarkan index
  const deleteKegiatan = (index) => {
    setKegiatan(prev => prev.filter((_, idx) => idx !== index));
  };

  // Update statistik otomatis setiap kali kegiatan berubah
  useEffect(() => {
    let sedang = 0, akan = 0, selesai = 0;
    const now = new Date();

    kegiatan.forEach(item => {
      if (item.statusManual === 'Selesai') {
        selesai += 1;
        return;
      }
      const mulai = new Date(`${item.tanggal}T${item.jamMulai || '00:00'}`);
      const akhir = new Date(`${item.tanggal}T${item.jamSelesai || '23:59'}`);

      if (now < mulai) akan += 1;
      else if (now >= mulai && now <= akhir) sedang += 1;
      else selesai += 1;
    });

    setStatistikData([
      { label: 'Sedang Berlangsung', value: sedang },
      { label: 'Akan Datang', value: akan },
      { label: 'Selesai', value: selesai },
    ]);
  }, [kegiatan]);

  return (
    <KegiatanContext.Provider value={{
      kegiatan,
      setKegiatan,
      addKegiatan,
      editKegiatan,
      deleteKegiatan,
      statistikData
    }}>
      {children}
    </KegiatanContext.Provider>
  );
};
