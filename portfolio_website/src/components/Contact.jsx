// components/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    service_type: "",
    project_brief: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    e.target.reset();
    setTimeout(() => setFormSuccess(false), 5000);
  };

  const validateForm = () => {
    const errors = {};

    // First Name
    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required.";
    } else if (formData.first_name.trim().length < 2) {
      errors.first_name = "First name must be at least 2 characters.";
    }

    // Last Name
    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required.";
    } else if (formData.last_name.trim().length < 2) {
      errors.last_name = "Last name must be at least 2 characters.";
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Please enter a valid email address.";
    }

    // Project Brief
    if (!formData.project_brief.trim()) {
      errors.project_brief = "Please tell us about your project.";
    } else if (formData.project_brief.trim().length < 20) {
      errors.project_brief =
        "Project brief should be at least 20 characters.";
    } else if (formData.project_brief.trim().length > 5000) {
      errors.project_brief =
        "Project brief cannot exceed 5000 characters.";
    }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
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
            <a href="mailto:ogbaro5@gmail.com" className="contact-link">
              <span className="contact-link-icon">✉️</span>
              <div>
                <div className="contact-link-text">ogbaro5@gmail.com</div>
                <div className="contact-link-sub">Email — fastest response</div>
              </div>
            </a>
            <a href="tel:+2348155577839" className="contact-link">
              <span className="contact-link-icon">📞</span>
              <div>
                <div className="contact-link-text">+234 815 557 7839</div>
                <div className="contact-link-sub">Phone — Lagos, Nigeria</div>
              </div>
            </a>
            <a href="/projects" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link-icon">🎬</span>
              <div>
                <div className="contact-link-text">Portfolio</div>
                <div className="contact-link-sub">Full work archive</div>
              </div>
            </a>
            {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="contact-link-icon">💼</span>
              <div>
                <div className="contact-link-text">LinkedIn</div>
                <div className="contact-link-sub">Professional profile</div>
              </div>
            </a> */}

            <button className="form-submit">Schedule a call</button>
          </div>
        </div>

        <div>
          <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" onChange={(e)=> setFormData(prevData => ({...prevData, first_name: e.target.value}))} className="form-input" placeholder="John" required />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" onChange={(e)=> setFormData(prevData => ({...prevData, last_name: e.target.value}))} className="form-input" placeholder="Doe" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" onChange={(e)=> setFormData(prevData => ({...prevData, email: e.target.value}))} className="form-input" placeholder="john@company.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Service Needed</label>
              <select className="form-select form-input" onChange={(e)=> setFormData(prevData => ({...prevData, service_type: e.target.value}))}>
                <option value="">Select a service...</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Motion Design">Motion Design</option>
                <option value="Cinematography">Cinematography</option>
                <option value="AI Content Creation">AI Content Creation</option>
                <option value="Full Production">Full Production</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Project Brief</label>
              <textarea onChange={(e)=> setFormData(prevData => ({...prevData, project_brief: e.target.value}))} className="form-textarea" placeholder="Tell me about your project — what you want to achieve, your timeline, and your budget if you're comfortable sharing..." required></textarea>
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
