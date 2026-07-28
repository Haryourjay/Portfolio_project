import { useLocation } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { useEffect } from "react";

export default function ProjectSection({
    title,
    projects,
    onOpen
}) {

    const location = useLocation()
    
    useEffect(() => {
        const reveals = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger stat cards top bar
            if (entry.target.classList.contains('stat-card')) {
                entry.target.classList.add('visible');
            }
            }
        });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        reveals.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [location.pathname]);
    
    return (

        <section className="project-section reveal">

            <h2>{title}</h2>

            <div className="project-grid">

                {projects.map(project => (

                    <ProjectCard
                        key={project.id}
                        project={project}
                        onOpen={onOpen}
                    />

                ))}

            </div>

        </section>

    );

}