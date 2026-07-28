import ProjectCard from "./ProjectCard";

export default function ProjectSection({
    title,
    projects,
    onOpen
}) {
    
    return (

        <section className="project-section">

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