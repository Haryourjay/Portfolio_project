// components/Work.js
import { useContext, useEffect, useState } from 'react';
import ModalContext from '../context/ModalContext';
import ProjectVideoModal from './ProjectVideoModal';
import { getShowcaseVideos } from '../services/portfolioAPI';
import { useLocation } from 'react-router-dom';

const projectData = [
  {
    icon: '🎥',
    label: 'Add project thumbnail',
    cat: 'Brand Film',
    title: 'QTA Brand Campaign',
    client: 'QTA — London, UK',
    tags: ['Premiere Pro', 'After Effects', 'Color Grading'],
    delay: ''
  },
  {
    icon: '⚡',
    label: 'Add project thumbnail',
    cat: 'AI Video',
    title: 'Equally AI Product Series',
    client: 'Equally AI — Tel Aviv, Israel',
    tags: ['AI Video', 'Motion Design'],
    delay: 'reveal-delay-1'
  },
  {
    icon: '📚',
    label: 'Add project thumbnail',
    cat: 'Educational',
    title: 'AltSchool Africa Docs',
    client: 'AltSchool Africa — Nigeria',
    tags: ['Cinematography', 'DaVinci Resolve'],
    delay: 'reveal-delay-2'
  },
  {
    icon: '🚀',
    label: 'Add project thumbnail',
    cat: 'Motion Graphics',
    title: 'DABA Academy Series',
    client: 'Digital Abundance — Lagos',
    tags: ['After Effects', 'Blender', 'C4D'],
    delay: 'reveal-delay-3'
  },
  {
    icon: '🎞️',
    label: 'Feature project — add showreel',
    cat: 'Showreel',
    title: "2024–2025 Director's Reel — 5 Years of Visual Storytelling",
    client: 'Personal Work',
    tags: ['All Disciplines', 'Premiere Pro', 'DaVinci Resolve', 'After Effects', 'AI Video'],
    delay: '',
    isWide: true
  }
];

const Work = () => {
  const [selected, setSelected] = useState(null)
  const [projects, setProjects] = useState([])

  const location = useLocation()

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
        });
    });

    reveals.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
  }, [location.pathname, projects]);

  useEffect(() => {
    // getShowcaseVideos().then(res => {
    //     setProjects(res.data);
    // });
    setProjects(projectData);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="work">
      <div className="work-header">
        <div>
          <div className="section-eyebrow reveal">Selected Work</div>
          <h2 className="section-title reveal reveal-delay-1">Highlights</h2>
        </div>
        <a href="#contact" className="work-link reveal" onClick={(e) => handleSmoothScroll(e, '#contact')}>Commission a project →</a>
      </div>

      <div className="work-grid">
        {projects.map((project, index) => (
          <div key={index} className={`work-item reveal ${project.delay}`} onClick={() => setSelected(project)}>
            <div className="work-thumb">
              <div className="work-thumb-icon">{project.icon}</div>
              <div className="work-thumb-label">{project.label}</div>
            </div>
            <div className="work-overlay">
              <div className="work-cat">{project.cat}</div>
              <div className="work-title">{project.title}</div>
              <div className="work-client">{project.client}</div>
              <div className="work-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="work-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="work-play-btn" style={project.isWide ? { transform: 'translate(-50%,-50%) scale(1)', width: '80px', height: '80px', fontSize: '1.6rem' } : {}}>▶</div>
          </div>
        ))}
      </div>

      {selected &&
        <ProjectVideoModal
            project={selected}
            onClose={() => setSelected(null)}
        />
     }
    </section>
  );
};

export default Work;
