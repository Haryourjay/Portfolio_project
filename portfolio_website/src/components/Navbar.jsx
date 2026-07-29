// // components/Navbar.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate()
//   const location = useLocation();

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 60);
//     };
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const handleSmoothScroll = (e, targetId, by_navigate=false) => {
//     e.preventDefault();
//     if (by_navigate) {
//       return navigate(targetId)
//     }

//     if (location.pathname === '/projects') {
//       // navigate(`/${targetId}`)
//       navigate({
//         pathname: "/",
//         hash: targetId,
//       });
//     }
    
//     const target = document.querySelector(targetId);
//     if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   return (
//     <nav className={scrolled ? 'scrolled' : ''}>
//       <a href="#hero" className="nav-logo" onClick={(e) => handleSmoothScroll(e, '#hero')}>AO<span>.</span></a>
//       <ul className="nav-links">
//         <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a></li>
//         <li><a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>Services</a></li>
//         <li><a href="#work" onClick={(e) => handleSmoothScroll(e, '#work')}>Highlights</a></li>
//         <li><a href="#experience" onClick={(e) => handleSmoothScroll(e, '#experience')}>Clients</a></li>
//         <li><a href="/projects" onClick={(e) => handleSmoothScroll(e, 'projects', true)}>Projects</a></li>
//         <li><a href="#contact" className="nav-cta" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact Me</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo.png'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleSmoothScroll = (e, targetId, byNavigate = false) => {
    e.preventDefault();
    setMenuOpen(false);

    if (byNavigate) {
      navigate(targetId);
      return;
    }

    if (location.pathname === "/projects") {
      navigate({
        pathname: "/",
        hash: targetId,
      });
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className={`${scrolled ? "scrolled" : ""}`}>
      <a
        href="#hero"
        className="nav-logo"
        onClick={(e) => handleSmoothScroll(e, "#hero")}
      >
        {/* AO<span>.</span> */}
        <div style={{height: '20px', width: '20px', borderRadius: '100%'}}>
          <img src={logo} alt="Logo image" style={{width: '100%', objectFit: 'cover', borderRadius: '100%'}}/>
        </div>
      </a>

      <button
        className={`menu-btn ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")}>
            About
          </a>
        </li>

        <li>
          <a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, "#services")}
          >
            Services
          </a>
        </li>

        <li>
          <a href="#work" onClick={(e) => handleSmoothScroll(e, "#work")}>
            Highlights
          </a>
        </li>

        <li>
          <a
            href="#experience"
            onClick={(e) => handleSmoothScroll(e, "#experience")}
          >
            Clients
          </a>
        </li>

        <li>
          <a
            href="/projects"
            onClick={(e) => handleSmoothScroll(e, "projects", true)}
          >
            Projects
          </a>
        </li>

        <li>
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
          >
            Book a call
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
