import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { KegiatanContext } from '../../contexts/KegiatanContext';

// Mendapatkan info kegiatan pada tanggal tertentu
const getKegiatanByDate = (date, kegiatan) => {
  const tanggal = date.toISOString().split('T')[0];
  return kegiatan.filter(item => item.tanggal === tanggal);
};

const KegiatanCalendar = () => {
  const { kegiatan } = useContext(KegiatanContext);

  return (
    <div className="calendar-wrapper">
      <Calendar
        tileClassName={({ date }) => {
          const kegiatanDiTanggal = getKegiatanByDate(date, kegiatan);
          return kegiatanDiTanggal.length > 0 ? 'calendar-event-highlight' : null;
        }}
        tileContent={({ date }) => {
          const kegiatanDiTanggal = getKegiatanByDate(date, kegiatan);
          // Jika ada kegiatan, tampilkan dot dan tooltip
          if (kegiatanDiTanggal.length > 0) {
            return (
              <div
                className="calendar-dot"
                title={kegiatanDiTanggal.map(k => k.nama_kegiatan + ' (' + k.status + ')').join(', ')}
              />
            );
          }
          return null;
        }}
      />
      <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#555' }}>
        <span className="calendar-dot"></span> Tanggal ada kegiatan
      </div>
    </div>
  );
};

export default KegiatanCalendar;
