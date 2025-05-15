import React, { useContext } from 'react';
import { KegiatanContext } from '../../contexts/KegiatanContext';

const KegiatanList = () => {
  const { kegiatan } = useContext(KegiatanContext);

  return (
    <div>
      <h2>Daftar Kegiatan</h2>
      <ul className="kegiatan-list">
        {kegiatan.length === 0 && <li>Tidak ada kegiatan.</li>}
        {kegiatan.map((item, idx) => (
          <li key={idx}>
            <strong>{item.nama_kegiatan}</strong> <br />
            Jenis: {item.jenis_kegiatan} <br />
            Tanggal: {item.tanggal} <br />
            Status: {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KegiatanList;
