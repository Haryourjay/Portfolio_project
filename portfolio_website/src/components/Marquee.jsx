// components/Marquee.js
import React from 'react';

const Marquee = () => {
  const items = [
    'Video Editing', 'Motion Design', 'Cinematography', 'AI Content',
    'Visual Storytelling', 'Brand Films', 'Motion Graphics'
  ];

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-inner">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <span className="sep">—</span>
          </React.Fragment>
        ))}
        {items.map((item, index) => (
          <React.Fragment key={`dup-${index}`}>
            <span>{item}</span>
            <span className="sep">—</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
