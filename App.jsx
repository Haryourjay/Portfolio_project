// App.js
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Grain from './components/Grain';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    // ─── INTERSECTION OBSERVER (reveals) ───
    const reveals = document.querySelectorAll('.reveal');
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
  }, [])


  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Grain />
      <VideoModal isOpen={modalOpen} onClose={closeModal} />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work onOpenModal={openModal} />
      <Experience />
      <Skills />
      <Process />
      <Testimonials />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
