// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSmoothScroll = (e, targetId, by_navigate=false) => {
    e.preventDefault();
    if (by_navigate) {
      return navigate(targetId)
    }

    if (location.pathname === '/projects') {
      navigate(`/${targetId}`)
    }
    
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#hero" className="nav-logo" onClick={(e) => handleSmoothScroll(e, '#hero')}>AO<span>.</span></a>
      <ul className="nav-links">
        <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a></li>
        <li><a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>Services</a></li>
        <li><a href="#work" onClick={(e) => handleSmoothScroll(e, '#work')}>Highlights</a></li>
        <li><a href="#experience" onClick={(e) => handleSmoothScroll(e, '#experience')}>Clients</a></li>
        <li><a href="/projects" onClick={(e) => handleSmoothScroll(e, 'projects', true)}>Projects</a></li>
        <li><a href="#contact" className="nav-cta" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact Me</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
