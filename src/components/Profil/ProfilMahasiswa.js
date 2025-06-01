import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const defaultAvatar = "https://ui-avatars.com/api/?name=Profil&background=4ecdc4&color=fff&size=128";

const ProfilMahasiswa = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [noHp, setNoHp] = useState(user?.noHp || ''); // Tambahan
  const [avatar, setAvatar] = useState(user?.avatar || defaultAvatar);
  const fileInputRef = useRef();

  // Handle upload foto profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Simpan perubahan profil (nama, email, noHp, avatar)
  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email, noHp, avatar };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditMode(false);
  };

  // Reset perubahan jika batal
  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setNoHp(user?.noHp || '');
    setAvatar(user?.avatar || defaultAvatar);
    setEditMode(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page-wrapper fade-in">
      <div className="profile-glass-card">
        <div className="profile-cover-gradient"></div>
        <div className="profile-avatar-wrapper">
          <img
            className="profile-avatar"
            src={avatar}
            alt={user.name}
          />
          {editMode && (
            <button
              type="button"
              className="profile-avatar-edit-btn"
              onClick={() => fileInputRef.current.click()}
            >
              Ubah Foto
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
        <div className="profile-info">
          {editMode ? (
            <form onSubmit={handleSave} className="profile-edit-form">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nama"
                required
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="text"
                value={noHp}
                onChange={e => setNoHp(e.target.value)}
                placeholder="Nomor HP"
                required
              />
              <div style={{ marginTop: '1.2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button type="submit">Simpan</button>
                <button type="button" onClick={handleCancel} style={{ background: '#e63946', color: '#fff' }}>Batal</button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="profile-name">{user.name || 'Nama Mahasiswa'}</h2>
              <p className="profile-email">{user.email || '-'}</p>
              <p className="profile-nohp">{user.noHp ? `No HP: ${user.noHp}` : ''}</p>
            </>
          )}
        </div>
        {!editMode && (
          <button className="profile-edit-btn" onClick={() => setEditMode(true)}>
            Edit Profil
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilMahasiswa;
