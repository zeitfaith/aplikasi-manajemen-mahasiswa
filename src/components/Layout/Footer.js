import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        {year} ActiVibes | &copy; faith
      </p>
    </footer>
  );
};

export default Footer;
