// contexts/KegiatanContext.js
import React, { createContext, useState, useEffect } from "react";

export const KegiatanContext = createContext();

export const KegiatanProvider = ({ children }) => {
  const [kegiatan, setKegiatan] = useState([]);

  // Fetch data kegiatan dari backend saat app mulai
  useEffect(() => {
    fetch("http://localhost:6543/kegiatan")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.data)) {
          // Mapping snake_case ke camelCase jika perlu
          const normalized = data.data.map((item) => ({
            ...item,
            jamMulai: item.jam_mulai,
            jamSelesai: item.jam_selesai,
          }));
          setKegiatan(normalized);
        } else {
          setKegiatan([]);
        }
      })
      .catch(() => setKegiatan([]));
  }, []);

  // Fungsi edit dan hapus dapat kamu implementasikan di sini, misalnya:
  const editKegiatan = (idx, newData) => {
    setKegiatan((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], ...newData };
      return updated;
    });
  };

  const deleteKegiatan = (idx) => {
    setKegiatan((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <KegiatanContext.Provider
      value={{ kegiatan, setKegiatan, editKegiatan, deleteKegiatan }}
    >
      {children}
    </KegiatanContext.Provider>
  );
};
