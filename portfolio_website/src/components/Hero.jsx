// components/Hero.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate()

  const handleSmoothScroll = (e, targetId, byNavigate = false) => {
    e.preventDefault();
    if (byNavigate) {
      navigate(targetId);
      return;
    }
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <div className="eyebrow-dot"></div>
          <span className="eyebrow-text">Available for projects</span>
        </div>

        <h1 className="hero-headline">
          Crafting Stories<br />That <em>Move</em> People.
        </h1>

        <p className="hero-roles">
          Video Editor <span>•</span> Motion Designer <span>•</span> Cinematographer <span>•</span> AI Content Creator
        </p>

        <p className="hero-sub">
          Helping brands, businesses, and creators transform ideas into compelling visual experiences that leave lasting impressions.
        </p>

        <div className="hero-ctas">
          <a href="#work" className="btn-primary" onClick={(e) => handleSmoothScroll(e, 'projects', true)}>
            ▶ View Portfolio
          </a>
          <a href="#contact" className="btn-secondary" onClick={(e) => handleSmoothScroll(e, '#contact')}>
            Let's Work Together →
          </a>
        </div>
      </div>

      {/* <div className="hero-portrait">
        <div className="portrait-frame">
          <div className="portrait-placeholder">
            <div className="portrait-icon">📸</div>
            <div className="portrait-label">Ayotunde Ogbaro</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--faint)', letterSpacing: '0.1em' }}>Replace with portrait photo</div>
          </div>
          <div className="portrait-accent-line"></div>
        </div>
      </div> */}

      <div className="hero-scroll-hint">
        <div className="scroll-line"></div>
        <span className="scroll-hint-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
