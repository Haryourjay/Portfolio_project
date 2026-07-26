// components/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    e.target.reset();
    setTimeout(() => setFormSuccess(false), 5000);
  };

  return (
    <section id="contact">
      <div className="contact-bg"></div>
      <div className="contact-inner">
        <div>
          <div className="section-eyebrow reveal">Get In Touch</div>
          <h2 className="contact-headline reveal reveal-delay-1">
            Let's Create<br />Something <em>Extraordinary.</em>
          </h2>
          <p className="contact-desc reveal reveal-delay-2">
            Whether you have a clear vision or just a spark of an idea — I'll help you turn it into a visual story that moves your audience. Let's talk.
          </p>

          <div className="contact-links reveal reveal-delay-3">
            <a href="mailto:ayotundeogbaro@email.com" className="contact-link">
              <span className="contact-link-icon">✉️</span>
              <div>
                <div className="contact-link-text">ayotundeogbaro@email.com</div>
                <div className="contact-link-sub">Email — fastest response</div>
              </div>
            </a>
            <a href="tel:+2340000000000" className="contact-link">
              <span className="contact-link-icon">📞</span>
              <div>
                <div className="contact-link-text">+234 000 000 0000</div>
                <div className="contact-link-sub">Phone — Lagos, Nigeria</div>
              </div>
            </a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link-icon">🎬</span>
              <div>
                <div className="contact-link-text">Vimeo Portfolio</div>
                <div className="contact-link-sub">Full work archive</div>
              </div>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link-icon">💼</span>
              <div>
                <div className="contact-link-text">LinkedIn</div>
                <div className="contact-link-sub">Professional profile</div>
              </div>
            </a>
          </div>
        </div>

        <div>
          <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" placeholder="John" required />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" placeholder="Doe" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="john@company.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Service Needed</label>
              <select className="form-select form-input">
                <option value="">Select a service...</option>
                <option>Video Editing</option>
                <option>Motion Design</option>
                <option>Cinematography</option>
                <option>AI Content Creation</option>
                <option>Full Production</option>
                <option>Consultation</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Project Brief</label>
              <textarea className="form-textarea" placeholder="Tell me about your project — what you want to achieve, your timeline, and your budget if you're comfortable sharing..." required></textarea>
            </div>
            <button type="submit" className="form-submit">Send Message →</button>
            {formSuccess && (
              <p id="form-success" style={{ color: 'var(--accent)', fontSize: '0.85rem', textAlign: 'center', marginTop: '12px' }}>
                ✓ Message sent! I'll be in touch within 24 hours.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
