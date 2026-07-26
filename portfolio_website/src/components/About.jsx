// components/About.js
import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="section-eyebrow reveal">The Story</div>

      <div className="about-grid">
        <div className="about-text reveal">
          <h2 className="section-title" style={{ marginBottom: '32px' }}>A creative<br />built for the<br /><em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>visual age.</em></h2>
          <p>
            I'm <strong>Ayo</strong> — a video editor, motion designer, and cinematographer with over <strong>5 years</strong> crafting stories that do more than look good. I build visual experiences that make audiences lean in, brands feel alive, and ideas land with force.
          </p>
          <p>
            My work spans commercial video production, motion graphics, AI-assisted filmmaking, and full-scale visual campaigns. I've collaborated with brands, educators, and content creators across Nigeria, the UK, US, etc — translating vision into video that converts.
          </p>
          <p>
            What sets me apart isn't just technical skill — it's an obsession with the emotional arc of every frame. Every cut, transition, and visual effect serves the story, not the ego.
          </p>
          <div className="about-highlight">
            <p>"Every frame is a decision. Every cut is an argument. I make them both count."</p>
          </div>
        </div>

        <div>
          <div className="stats-grid reveal reveal-delay-1">
            <div className="stat-card">
              <div className="stat-num">5<span className="accent">+</span></div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">300<span className="accent">+</span></div>
              <div className="stat-label">Video Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">20K<span className="accent">+</span></div>
              <div className="stat-label">Audience Reached</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">4</div>
              <div className="stat-label">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
