// App.js
import { useEffect, useRef, useState } from 'react';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css';

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
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import AppLayout from './layout/AppLayout';
import ProjectPage from './pages/ProjectsPage';




export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage />},
      { path: "projects", element: <ProjectPage /> },
    ],
  }

]);


function App() {
  // const [modalOpen, setModalOpen] = useState(false);

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
