import React from 'react';

const KegiatanItem = ({ kegiatan, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{kegiatan.nama_kegiatan}</h3>
      <p>Jenis: {kegiatan.jenis_kegiatan}</p>
      <p>Tanggal: {kegiatan.tanggal}</p>
      <p>Status: {kegiatan.status}</p>
      <button onClick={() => onEdit(kegiatan)}>Edit</button>
      <button onClick={() => onDelete(kegiatan.id)}>Hapus</button>
    </div>
  );
};

export default KegiatanItem;
