import React, { useContext, useState } from 'react';
import { KegiatanContext } from '../../contexts/KegiatanContext';

const statusLabel = {
  'Sedang Berlangsung': 'primary',
  'Akan Datang': 'info',
  'Selesai': 'success',
};

function getStatusKegiatan(item) {
  if (item.statusManual === 'Selesai') return 'Selesai';
  const now = new Date();
  const mulai = new Date(`${item.tanggal}T${item.jamMulai || '00:00'}`);
  const selesai = new Date(`${item.tanggal}T${item.jamSelesai || '23:59'}`);
  if (now < mulai) return 'Akan Datang';
  if (now >= mulai && now <= selesai) return 'Sedang Berlangsung';
  return 'Selesai';
}

const KegiatanList = () => {
  const { kegiatan, setKegiatan, editKegiatan, deleteKegiatan } = useContext(KegiatanContext);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (idx, item) => {
    setEditIdx(idx);
    setEditData({
      nama_kegiatan: item.nama_kegiatan,
      jenis_kegiatan: item.jenis_kegiatan,
      tanggal: item.tanggal,
      jamMulai: item.jamMulai,
      jamSelesai: item.jamSelesai,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (idx) => {
    editKegiatan(idx, editData);
    setEditIdx(null);
    setEditData({});
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Daftar Kegiatan</h2>
      <ul className="kegiatan-list">
        {kegiatan.length === 0 && <li>Tidak ada kegiatan.</li>}
        {kegiatan.map((item, idx) => {
          const status = getStatusKegiatan(item);
          const isEditing = editIdx === idx;
          return (
            <li
              key={idx}
              className={`kegiatan-card kegiatan-status-${status.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="nama_kegiatan"
                    value={editData.nama_kegiatan}
                    onChange={handleEditChange}
                    style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, width: '100%' }}
                  />
                  <input
                    type="date"
                    name="tanggal"
                    value={editData.tanggal}
                    onChange={handleEditChange}
                    style={{ marginRight: 8, marginBottom: 8 }}
                  />
                  <input
                    type="time"
                    name="jamMulai"
                    value={editData.jamMulai}
                    onChange={handleEditChange}
                    style={{ marginRight: 8 }}
                  />
                  <input
                    type="time"
                    name="jamSelesai"
                    value={editData.jamSelesai}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="jenis_kegiatan"
                    value={editData.jenis_kegiatan}
                    onChange={handleEditChange}
                    placeholder="Jenis Kegiatan"
                    style={{ marginLeft: 8 }}
                  />
                  <div style={{ marginTop: 10 }}>
                    <button
                      onClick={() => handleEditSubmit(idx)}
                      style={{
                        background: '#4caf50', color: '#fff', border: 'none',
                        borderRadius: '1em', padding: '0.2em 1em', marginRight: 8, cursor: 'pointer'
                      }}
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditIdx(null)}
                      style={{
                        background: '#e63946', color: '#fff', border: 'none',
                        borderRadius: '1em', padding: '0.2em 1em', cursor: 'pointer'
                      }}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="kegiatan-title">{item.nama_kegiatan}</div>
                  <div className="kegiatan-meta">
                    <span className={`kegiatan-badge badge-${statusLabel[status] || 'default'}`}>
                      {status}
                    </span>
                    <span className="kegiatan-date">
                      <i className="fa fa-calendar" style={{ marginRight: 6 }}></i>
                      {item.tanggal}
                    </span>
                    <span className="kegiatan-jam">
                      <i className="fa fa-clock" style={{ marginRight: 6 }}></i>
                      {item.jamMulai && item.jamSelesai
                        ? `${item.jamMulai} - ${item.jamSelesai}`
                        : (item.jamMulai || item.jamSelesai || '-')}
                    </span>
                    <span className="kegiatan-jenis">{item.jenis_kegiatan}</span>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(idx, item)}
                      style={{
                        marginLeft: '1em',
                        background: '#f7b32b',
                        color: '#2a3d66',
                        border: 'none',
                        borderRadius: '1em',
                        padding: '0.2em 1em',
                        cursor: 'pointer',
                        fontSize: '0.93em'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteKegiatan(idx)}
                      style={{
                        marginLeft: '0.5em',
                        background: '#e63946',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '1em',
                        padding: '0.2em 1em',
                        cursor: 'pointer',
                        fontSize: '0.93em'
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default KegiatanList;
