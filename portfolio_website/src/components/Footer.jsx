// components/Footer.js
import React from 'react';
import instagramLogo from '../assets/Logos/Socials/instagramLogo.png'
import linkedInLogo from '../assets/Logos/Socials/linkedInLogo.svg'
import pinterestLogo from '../assets/Logos/Socials/pinterestLogo.png'
import twitterLogo from '../assets/Logos/Socials/twitterLogo.png'

const Footer = () => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer>
      <div>
        <a href="#hero" className="footer-logo" onClick={(e) => handleSmoothScroll(e, '#hero')}>Ayotunde Ogbaro<span>.</span></a>
        <div className='socials-container'>
          <a href="https://pin.it/2OAkCqtiv" className='socials'>
            <img src={pinterestLogo} alt="" />
          </a>
          <a href="https://www.instagram.com/haryourcre8?utm_source=qr&igsh=MXJpYnQ3czV4MGc1NA==" className='socials'>
            <img src={instagramLogo} alt="" />
          </a>
          <a href="https://x.com/Haryourcre8" className='socials'>
            <img src={twitterLogo} alt="" />
          </a>
          <a href="https://www.linkedin.com/in/ayotundeogbaro" className='socials'>
            <img src={linkedInLogo} alt="" />
          </a>
        </div>
      </div>
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
