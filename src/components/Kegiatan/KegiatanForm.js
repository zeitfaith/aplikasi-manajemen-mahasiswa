import React, { useState } from 'react';

const KegiatanForm = ({ onSave }) => {
  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [jenisKegiatan, setJenisKegiatan] = useState('Seminar');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('Sedang Berlangsung');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave({
        nama_kegiatan: namaKegiatan,
        jenis_kegiatan: jenisKegiatan,
        tanggal,
        status,
      });
      // Reset form
      setNamaKegiatan('');
      setJenisKegiatan('Seminar');
      setTanggal('');
      setStatus('Sedang Berlangsung');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Kegiatan</h2>
      <div>
        <label>Nama Kegiatan:</label>
        <input
          type="text"
          value={namaKegiatan}
          onChange={(e) => setNamaKegiatan(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Jenis Kegiatan:</label>
        <select value={jenisKegiatan} onChange={(e) => setJenisKegiatan(e.target.value)}>
          <option value="Seminar">Seminar</option>
          <option value="Lomba">Lomba</option>
          <option value="Organisasi">Organisasi</option>
        </select>
      </div>
      <div>
        <label>Tanggal:</label>
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Sedang Berlangsung">Sedang Berlangsung</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>
      <button type="submit">Simpan</button>
    </form>
  );
};

export default KegiatanForm;
