import Hero from "../components/Hero"
import Marquee from "../components/Marquee"
import About from "../components/About"
import Services from "../components/Services"
import Work from "../components/Work"
import Experience from "../components/Experience"
import Skills from "../components/Skills"
import Process from "../components/Process"
import Testimonials from "../components/Testimonials"
import Education from "../components/Education"
import Contact from "../components/Contact"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function HomePage() {
    const [sectionHash, setSectionHash] = useState('')
    const location = useLocation()
    
    const locationHash = location.hash

    if (locationHash !== sectionHash){
        setSectionHash(locationHash)
    }

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
        }, [location.pathname]);

    useEffect(() => {
        if (sectionHash !== ""){
            const target = document.querySelector(sectionHash);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [sectionHash])

    return (
        <>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Experience />
        <Skills />
        <Process />
        <Testimonials />
        {/* <Education /> */}
        <Contact />
        </>
    )
}