// components/Education.js
import React from 'react';

const educations = [
  {
    icon: '🎭',
    institution: 'EbonyLife Creative Academy',
    program: 'Film & Television Production — Africa\'s premier creative training ground, focused on world-class storytelling and production craft.',
    badge: 'Film & Storytelling',
    delay: ''
  },
  {
    icon: '🤖',
    institution: 'AI Multimedia Academy',
    program: 'AI-Assisted Filmmaking & Content Production — Cutting-edge training in generative AI tools for scalable creative production.',
    badge: 'AI & Technology',
    delay: 'reveal-delay-1'
  },
  {
    icon: '🏛️',
    institution: 'Yaba College of Technology',
    program: 'Formal technical education forming the academic backbone of a professional creative career in media and visual communication.',
    badge: 'Academic Foundation',
    delay: 'reveal-delay-2'
  }
];

const Education = () => {
  return (
    <section id="education" style={{ background: 'var(--surface)' }}>
      <div className="section-eyebrow reveal">Education & Training</div>
      <h2 className="section-title reveal reveal-delay-1">Built on solid<br />foundations.</h2>

      <div className="edu-cards">
        {educations.map((edu, index) => (
          <div key={index} className={`edu-card reveal ${edu.delay}`}>
            <div className="edu-icon">{edu.icon}</div>
            <div className="edu-institution">{edu.institution}</div>
            <p className="edu-program">{edu.program}</p>
            <div className="edu-badge">{edu.badge}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
