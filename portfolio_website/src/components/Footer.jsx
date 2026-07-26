// components/Footer.js
import React from 'react';

const Footer = () => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer>
      <a href="#hero" className="footer-logo" onClick={(e) => handleSmoothScroll(e, '#hero')}>Ayotunde Ogbaro<span>.</span></a>
      <p className="footer-copy">© 2025 Ayotunde Ogbaro. All rights reserved.</p>
      <div className="footer-links">
        <a href="#work" onClick={(e) => handleSmoothScroll(e, '#work')}>Work</a>
        <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a>
        <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>Services</a>
        <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
