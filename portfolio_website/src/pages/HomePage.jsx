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

export default function HomePage() {
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
        <Education />
        <Contact />
        </>
    )
}