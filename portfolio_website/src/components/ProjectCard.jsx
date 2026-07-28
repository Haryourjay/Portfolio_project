import { useContext, useRef, useState } from "react";
import ReactPlayer from "react-player";
import ModalContext from "../context/ModalContext";

export default function ProjectCard({ project, onOpen }) {
    const [playing, setPlaying] = useState(false);
    const ref = useRef();
    const { openModal, selectVideo } = useContext(ModalContext)

    const handleClick = () => {
        selectVideo(project)
        openModal()
    }

    return (

        <div
            className="project-card"
            // onMouseEnter={() => ref.current?.seekTo(0)}
            onMouseEnter={() => setPlaying(true)}
            onMouseLeave={() => setPlaying(false)}
            onClick={() => onOpen(project)}
            // onClick={handleClick}
        >

            <div className="video-wrapper">

                <ReactPlayer
                    ref={ref}
                    src={project.url}
                    width="100%"
                    height="100%"
                    playing={playing}
                    muted={true}
                    loop={true}
                    controls={false}
                    playsinline
                    // config={{
                    //     youtube: {
                    //         playerVars: {
                    //             controls: 0,
                    //             disablekb: 1
                    //         }
                    //     }
                    // }}
                />

            </div>

            <div className="project-info">

                <h3>{project.title}</h3>

                {project.description &&
                    <p>{project.description}</p>
                }

            </div>

        </div>

    );

}