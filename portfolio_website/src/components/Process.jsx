// components/Process.js
import React from 'react';

const steps = [
  { num: '01', title: 'Research & Strategy', desc: 'Deep dive into your brand, audience, and objectives. Every frame starts with understanding the story you need to tell.' },
  { num: '02', title: 'Storyboarding & Planning', desc: 'Visual blueprinting. Shot lists, narrative structure, and mood boards that define the cinematic vision before a camera rolls.' },
  { num: '03', title: 'Production', desc: 'On-set or in-studio — capturing footage with precision and creative intent. Every shot is purposeful, nothing is wasted.' },
  { num: '04', title: 'Editing & Motion', desc: 'Where raw material becomes narrative gold. Cutting, grading, compositing, and animating until the story is fully realized.' },
  { num: '05', title: 'Delivery & Optimization', desc: 'Final assets exported for every platform and format. Performance review to ensure the content achieves its intended impact.' }
];

const Process = () => {
  return (
    <section id="process">
      <div className="section-eyebrow reveal">How I Work</div>
      <h2 className="section-title reveal reveal-delay-1">The creative<br />process.</h2>

      <div className="process-steps">
        {steps.map((step, index) => (
          <div key={index} className={`process-step reveal ${index > 0 ? `reveal-delay-${index}` : ''}`}>
            <div className="process-num-wrap">
              <div className="process-num">{step.num}</div>
            </div>
            <div className="process-step-title">{step.title}</div>
            <p className="process-step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
