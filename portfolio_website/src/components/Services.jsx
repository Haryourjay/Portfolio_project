// components/Services.js
import React from 'react';
import { Bot, Clapperboard, Scissors, Zap } from 'lucide-react';

const servicesData = [
  {
    // icon: '✂️',
    icon: <Scissors />,
    title: 'Video Editing',
    // desc: 'Precision-crafted editing that shapes raw footage into polished, compelling narratives.',
    list: ['Marketing & brand videos', 'YouTube content', 'Social media reels', 'Podcast & interview edits', 'Event coverage']
  },
  {
    // icon: '⚡',
    icon: <Zap />,
    title: 'Motion Design',
    // desc: 'Dynamic motion graphics and animations that add energy and identity to your visual brand.',
    list: ['Kinetic typography', 'Logo animations', 'Explainer videos', 'Title sequences', 'Motion graphics & VFX']
  },
  {
    // icon: '🎬',
    icon: <Clapperboard />,
    title: 'Cinematography',
    // desc: 'On-set visual expertise to capture footage that communicates brand character and story.',
    list: ['Commercial shoots', 'Interview & documentary', 'Educational content', 'Event coverage', 'Brand storytelling']
  },
  {
    // icon: '🤖',
    icon: <Bot />,
    title: 'AI Content Creation',
    // desc: 'Scalable, cutting-edge content production leveraging the best of AI filmmaking technology.',
    list: ['AI-assisted video generation', 'AI marketing creatives', 'Scalable content systems', 'AI x human storytelling', 'Next-gen production']
  }
];

const Services = () => {
  return (
    <section id="services">
      <div className="section-eyebrow reveal">Services</div>
      <h2 className="section-title reveal reveal-delay-1">Premium creatives</h2>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div key={index} className={`service-card reveal reveal-delay-${(index % 4) + 1}`}>
            <div className="service-icon"><div className="service-icon-inner">{service.icon}</div></div>
            <div className="service-title">{service.title}</div>
            <p className="service-desc">{service.desc}</p>
            <ul className="service-list">
              {service.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
