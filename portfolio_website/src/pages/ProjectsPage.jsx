import { useEffect, useState } from "react";
import "../styles/portfolio.css";

import { getPortfolioVideos } from "../services/portfolioAPI";
import ProjectSection from "../components/ProjectSection";
import ProjectVideoModal from "../components/ProjectVideoModal";
import VideoModal from "../components/VideoModal";

const categories = [
    {
        key: "youtube",
        title: "YouTube"
    },
    {
        key: "short_reels",
        title: "Shorts / Reels"
    },
    {
        key: "dtc_ugc",
        title: "DTC / UGC"
    },
    {
        key: "ads",
        title: "Ads"
    },
    {
        key: "motion_design",
        title: "Motion Design"
    }
];
{/* <iframe title="vimeo-player" src="https://player.vimeo.com/video/708466223?h=dd92ce1b46" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe> */}
const projectData = [
    {
        "id": 1,
        "title": "Nike Ad",
        "url": "https://youtu.be/GLdnKYWtBho?si=qUhvGqegVPOWrzj7",
        "category": "youtube",
        "description": "Commercial",
        "is_reel": false
    },
    {
        "id": 2,
        "title": "Nike Ad",
        "url": "https://vimeo.com/708466223?fl=pl&fe=sh",
        "category": "short_reels",
        "description": "Commercial",
        "is_reel": false
    },
    {
        "id": 3,
        "title": "Nike Ad",
        "url": "https://youtu.be/GLdnKYWtBho?si=qUhvGqegVPOWrzj7",
        "category": "dtc_ugc",
        "description": "Commercial",
        "is_reel": false
    },
    {
        "id": 4,
        "title": "Nike Ad",
        "url": "https://vimeo.com/708466223?fl=pl&fe=sh",
        "category": "ads",
        "description": "Commercial",
        "is_reel": false
    },
    {
        "id": 5,
        "title": "Nike Ad",
        "url": "https://youtu.be/GLdnKYWtBho?si=qUhvGqegVPOWrzj7",
        "category": "motion_design",
        "description": "Commercial",
        "is_reel": false
    },
    {
        "id": 6,
        "title": "Nike Ad",
        "url": "https://youtu.be/GLdnKYWtBho?si=qUhvGqegVPOWrzj7",
        "category": "dtc_ugc",
        "description": "Commercial",
        "is_reel": true
    },

]

export default function Portfolio() {

    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        // getPortfolioVideos().then(res => {
        //     setProjects(res.data);
        // });
        setProjects(projectData);
    }, []);

    return (

        <div className="portfolio">

            <h1 className="hero-headline"><span>Motion</span> <br /> <em>Archive</em></h1>

            {categories.map(category => {

                const categoryProjects = projects.filter(
                    p => p.category === category.key && !p.is_reel
                );

                if (!categoryProjects.length) return null;

                return (
                    <ProjectSection
                        key={category.key}
                        title={category.title}
                        projects={categoryProjects}
                        onOpen={setSelected}
                    />
                );

            })}

            {selected &&
                <ProjectVideoModal
                    project={selected}
                    onClose={() => setSelected(null)}
                />
            }
            {/* {selected &&
                <VideoModal
                    isOpen={selected !== null}
                    onClose={() => setSelected(null)}
                />
            } */}

        </div>

    );
}