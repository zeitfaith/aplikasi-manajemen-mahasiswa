import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const EditProfilForm = ({ onUpdate }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [noHp, setNoHp] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setNoHp(user.noHp || '');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, email, noHp });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profil</h2>
      <div>
        <label>Nama:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>No HP:</label>
        <input
          type="text"
          value={noHp}
          onChange={(e) => setNoHp(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProfilForm;
