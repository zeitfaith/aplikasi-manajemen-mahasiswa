import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <div className="home-landing-wrapper">
        <div className="home-landing-card">
          <img
            src="/activehome.png"
            alt="Activehome Logo"
            className="home-landing-logo"
          />
          <h1>Selamat Datang di <span style={{ color: "#4ecdc4" }}>ActiveVibe!</span></h1>
          <p className="home-landing-desc">
            Kelola, lacak, dan rencanakan semua aktivitas dengan mudah dan penuh gaya<br />
            Tetap produktif dan jangan lewatkan satu pun momen penting!
          </p>
          <button className="home-landing-btn" onClick={() => navigate('/dashboard')}>
            Pergi ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
