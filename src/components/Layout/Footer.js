import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        {year} Aplikasi Manajemen Kegiatan Mahasiswa | &copy; faith
      </p>
    </footer>
  );
};

export default Footer;
