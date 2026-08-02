import { useEffect, useState } from "react";
import "../styles/portfolio.css";

import { getPortfolioVideos } from "../services/portfolioAPI";
import ProjectSection from "../components/ProjectSection";
import ProjectVideoModal from "../components/ProjectVideoModal";
import VideoModal from "../components/VideoModal";
import { useLocation } from "react-router-dom";

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
        key: "live_action",
        title: "Live Action"
    },
    {
        key: "movies",
        title: "Movies"
    },
    {
        key: "motion_design",
        title: "Motion Design"
    }
    
];

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
    const [isLoading, setIsloading] = useState(true)
    const [projects, setProjects] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setIsloading(true)
        getPortfolioVideos().then(res => {
            setProjects(res.data);
        }).catch(err=> console.error(err)).finally(setIsloading(false));
    }, []);

    return (

        <div className="portfolio">

            <h1 className="hero-headline"><span>Projects</span> <br /> <em>Archive</em></h1>

            {isLoading ? (
                <div class="loader" style={{height: '220px'}}>
                    <div class="spinner"></div>
                </div>
                ) : projects.length === 0  ? (
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <h3>No Projects Found</h3>
                        <p>Projects will be loaded shortly</p>
                    </div>
                ) : (
                    categories.map(category => {

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
                            defaultOpen={false}
                        />
                );

            })
                )
            }

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