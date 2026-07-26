// components/Skills.js
import React from 'react';

const skills = [
  { emoji: '🎞️', name: 'Adobe Premiere Pro' },
  { emoji: '🎨', name: 'DaVinci Resolve' },
  { emoji: '⚡', name: 'After Effects' },
  { emoji: '🖼️', name: 'Photoshop' },
  { emoji: '✏️', name: 'Illustrator' },
  { emoji: '🎙️', name: 'Adobe Audition' },
  { emoji: '🧊', name: 'Blender' },
  { emoji: '🔮', name: 'Cinema 4D' },
  { emoji: '📱', name: 'CapCut' },
  { emoji: '🤖', name: 'AI Video Tools' }
];

const Skills = () => {
  return (
    <section id="skills">
      <div className="section-eyebrow reveal">Toolkit</div>

      <div className="skills-layout">
        <div className="skills-intro reveal">
          <h2 className="section-title" style={{ marginBottom: '32px' }}>Tools of<br />the craft.</h2>
          <p>
            Five years of professional production has refined my stack to the tools that matter. I work across industry-standard applications and emerging AI platforms — choosing the right tool for the story, not the trend.
          </p>
          <p style={{ marginTop: '16px' }}>
            Hover each tool to explore. The real skill isn't knowing the software — it's knowing when and why to use it.
          </p>
        </div>

        <div className="skills-grid reveal reveal-delay-2">
          {skills.map((skill, index) => (
            <div key={index} className="skill-pill">
              <span className="skill-emoji">{skill.emoji}</span> {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
