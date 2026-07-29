// components/Testimonials.js
import React from 'react';

const testimonials = [
  {
    text: "Ayotunde has an extraordinary ability to understand what we're trying to say — and then say it better visually than we imagined. The campaign exceeded every KPI we set.",
    name: 'Dom Crane',
    role: 'Creative Director, DOM Visuals',
    delay: ''
  },
  {
    text: "Working with Ayotunde transformed how we think about video content. He doesn't just edit — he architects experiences. Our audience engagement tripled after the rebrand.",
    name: 'Ben Adenle',
    role: 'Founder, Rejoye',
    delay: 'reveal-delay-1'
  },
  {
    text: "The best investment we made in our content strategy. Ayotunde delivers at a level that makes you look twice — and then look for the nearest share button.",
    name: 'Sal Mohammed',
    role: 'Founder, QTA Group',
    delay: 'reveal-delay-2'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" style={{ background: 'var(--void)' }}>
      <div className="section-eyebrow reveal">What Clients Say</div>
      <h2 className="section-title reveal reveal-delay-1">Testimonials</h2>

      <div className="testimonials-carousel" style={{ marginTop: '60px' }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`testimonial-card reveal ${testimonial.delay}`}>
            <div className="quote-mark">"</div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">👤</div>
              <div>
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
