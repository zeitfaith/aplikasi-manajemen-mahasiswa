import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const ProfilMahasiswa = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profil Mahasiswa</h2>
      <p>Nama: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Prodi: {user.prodi}</p>
    </div>
  );
};

export default ProfilMahasiswa;
