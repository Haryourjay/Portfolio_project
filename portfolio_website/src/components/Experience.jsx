// components/Experience.js
import React from 'react';
import ClientsPartnersSection from './ToolkitBubbleSection';
import LogoLoop from './LogoLoop';
import cerebralHubLogo from '../assets/Logos/Clients/Cerebral Hub.png'
import CLILogo from '../assets/Logos/Clients/CLI.png'
import dabaLogo from '../assets/Logos/Clients/DABA.png'
import equallyAILogo from '../assets/Logos/Clients/Equally.png'
import greenStreetLogo from '../assets/Logos/Clients/Green-Street-Logo-2.png'
import loxaLogo from '../assets/Logos/Clients/Loxa.png'
import QTALogo from '../assets/Logos/Clients/QTA.png'
import VSPLogo from '../assets/Logos/Clients/VSP.png'
import AltSchoolLogo from '../assets/Logos/Clients/altschool_africa.png'

const experiences = [
  {
    date: '2022 — Present',
    location: '📍 London, UK',
    company: 'QTA',
    role: 'Video Editor',
    desc: 'Leading end-to-end video post-production for an international creative studio. Responsible for editing, color grading, and motion graphics across brand campaigns, commercial content, and digital marketing assets for diverse clients.',
    delay: ''
  },
  {
    date: '2023 — 2024',
    location: '📍 Tel Aviv, Israel',
    company: 'Equally AI',
    role: 'AI Video Content Producer',
    desc: 'Pioneered AI-assisted video content workflows for a tech startup. Created scalable content production systems using generative AI tools, producing marketing materials, product videos, and brand storytelling assets at unprecedented speed and quality.',
    delay: 'reveal-delay-1'
  },
  {
    date: '2021 — 2023',
    location: '📍 Lagos, Nigeria',
    company: 'Digital Abundance Business Academy',
    role: 'Team Lead, Video Production',
    desc: 'Led a video production team for a leading business education platform. Oversaw creative direction, production scheduling, and quality control for educational content reaching thousands of students. Managed full production pipelines from concept to delivery.',
    delay: 'reveal-delay-2'
  },
  {
    date: '2020 — 2021',
    location: '📍 Nigeria',
    company: 'AltSchool Africa',
    role: 'Cinematographer',
    desc: "On-set cinematographer for Africa's leading tech education institution. Captured documentary-style content, student stories, and institutional brand films that communicated the organization's mission to a Pan-African and global audience.",
    delay: 'reveal-delay-3'
  }
];

const clients = [
        {
            alt: 'Cerebral Hub Logo',
            src: cerebralHubLogo,
        },
        {
            alt: 'CLI Logo',
            src: CLILogo,
        },
        {
            alt: 'DABA Logo',
            src: dabaLogo,
        },
        {
            alt: 'EquallyAI Logo',
            src: equallyAILogo,
        },
        {
            alt: 'Green Street Media Logo',
            src: greenStreetLogo,
        },
        {
            alt: 'Loxa Logo',
            src: loxaLogo,
        },
        {
            alt: 'QTA Logo',
            src: QTALogo,
        },
        {
            alt: 'VSP Logo',
            src: VSPLogo,
        },
        {
          alt: 'Alt School Logo',
          src: AltSchoolLogo
        }
    ]

const Experience = () => {
  return (
    <section id="experience">
      <div className="section-eyebrow reveal">Clients</div>
      <h2 className="section-title reveal reveal-delay-1">Clients & Partners</h2>

      <div className="timeline">
        {/* TODO: Clients Logo */}
        <div style={{ height: '150px', position: 'relative', overflow: 'hidden'}}>
              {/* Basic horizontal loop */}
              <LogoLoop
                  logos={clients}
                  speed={50}
                  direction="left"
                  logoHeight={90}
                  gap={90}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="rgba(0,0,0, 0.6)"
                  ariaLabel="Technology partners"
              />
          </div>

        {/* {experiences.map((exp, index) => (
          <div key={index} className={`timeline-item reveal ${exp.delay}`}>
            <div className="timeline-date">
              <div className="timeline-date-text">{exp.date}</div>
              <div className="timeline-location">{exp.location}</div>
            </div>
            <div className="timeline-body">
              <div className="timeline-company">{exp.company}</div>
              <div className="timeline-role">{exp.role}</div>
              <p className="timeline-desc">{exp.desc}</p>
            </div>
          </div>
        ))} */}
      </div>
    </section>
  );
};

export default Experience;
