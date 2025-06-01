import React, { useState } from 'react';

const defaultJenis = ['Seminar', 'Lomba', 'Organisasi'];

const KegiatanForm = ({ onSave }) => {
  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [jenisKegiatan, setJenisKegiatan] = useState(defaultJenis[0]);
  const [tanggal, setTanggal] = useState('');
  const [jamMulai, setJamMulai] = useState('');
  const [jamSelesai, setJamSelesai] = useState('');
  const [jenisOptions, setJenisOptions] = useState(defaultJenis);
  const [jenisBaru, setJenisBaru] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave({
        nama_kegiatan: namaKegiatan,
        jenis_kegiatan: jenisKegiatan,
        tanggal,
        jamMulai,
        jamSelesai,
        // statusManual: undefined
      });
      setNamaKegiatan('');
      setJenisKegiatan(jenisOptions[0]);
      setTanggal('');
      setJamMulai('');
      setJamSelesai('');
    }
  };

  const handleTambahJenis = (e) => {
    e.preventDefault();
    if (jenisBaru && !jenisOptions.includes(jenisBaru)) {
      setJenisOptions([...jenisOptions, jenisBaru]);
      setJenisKegiatan(jenisBaru);
      setJenisBaru('');
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
          {jenisOptions.map((jenis, idx) => (
            <option key={idx} value={jenis}>{jenis}</option>
          ))}
        </select>
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Tambah jenis baru"
            value={jenisBaru}
            onChange={(e) => setJenisBaru(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={handleTambahJenis} style={{ padding: '0.3rem 0.8rem' }}>+</button>
        </div>
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
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <label>Jam Mulai:</label>
          <input
            type="time"
            value={jamMulai}
            onChange={(e) => setJamMulai(e.target.value)}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Jam Selesai:</label>
          <input
            type="time"
            value={jamSelesai}
            onChange={(e) => setJamSelesai(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Simpan</button>
    </form>
  );
};

export default KegiatanForm;
