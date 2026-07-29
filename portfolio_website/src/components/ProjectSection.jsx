// import { useLocation } from "react-router-dom";
// import ProjectCard from "./ProjectCard";
// import { useEffect } from "react";

// export default function ProjectSection({
//     title,
//     projects,
//     onOpen
// }) {

//     const location = useLocation()
    
//     useEffect(() => {
//         const reveals = document.querySelectorAll(".reveal");

//         const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//             // Trigger stat cards top bar
//             if (entry.target.classList.contains('stat-card')) {
//                 entry.target.classList.add('visible');
//             }
//             }
//         });
//         }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

//         reveals.forEach(el => observer.observe(el));

//         return () => observer.disconnect();
//     }, [location.pathname]);
    
//     return (

//         <section className="project-section reveal">

//             <h2>{title}</h2>

//             <div className="project-grid">

//                 {projects.map(project => (

//                     <ProjectCard
//                         key={project.id}
//                         project={project}
//                         onOpen={onOpen}
//                     />

//                 ))}

//             </div>

//         </section>

//     );

// }

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectSection({
    title,
    projects,
    onOpen,
    defaultOpen = false
}) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useEffect(() => {
        const reveals = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

                        if (entry.target.classList.contains("stat-card")) {
                            entry.target.classList.add("visible");
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -60px 0px",
            }
        );

        reveals.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [location.pathname]);

    return (
        <section className="project-section reveal">
            <button
                className={`project-accordion ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="project-accordion-left">
                    <h2>{title}</h2>
                    {/* <span className="project-count">
                        {projects.length} Project{projects.length !== 1 ? "s" : ""}
                    </span> */}
                </div>

                <span className="accordion-icon">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>

            <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                <div className="project-grid">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onOpen={onOpen}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}