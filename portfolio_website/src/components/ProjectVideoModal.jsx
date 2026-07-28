import ReactPlayer from "react-player";

export default function ProjectVideoModal({
    project,
    onClose
}) {

    return (

        <div
            className="project-video-modal"
            onClick={onClose}
        >

            <div
                className="video-modal-content"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div style={{paddingTop: '50px', width: '100%', height: '80%'}}>
                    <ReactPlayer
                        src={project.url}
                        width="100%"
                        height="100%"
                        playing={true}
                        controls
                        muted={false}
                    />
                </div>

                <h2>{project.title}</h2>

                <p>{project.description}</p>

            </div>

        </div>

    );

}