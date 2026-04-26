import { useEffect, useMemo, useRef, useState } from 'react';
import projectsRaw from './data/projects.json';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import ProjectModal from './components/ProjectModal';

const SECTION_IDS = ['hero', 'skills', 'projects', 'about'];

function App() {
  const mainRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [modalProject, setModalProject] = useState(null);
  const [showExplore, setShowExplore] = useState(false);

  const projects = useMemo(() => [...projectsRaw].sort((a, b) => b.id - a.id), []);

  useEffect(() => {
    document.title = 'Minh Triet Vu - Full-Stack Developer';
  }, []);

  useEffect(() => {
    const reveal = setTimeout(() => setShowExplore(true), 6200);
    return () => clearTimeout(reveal);
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root, threshold: 0.55 },
    );

    sectionRefs.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    let isScrolling = false;

    const onWheel = (event) => {
      if (modalProject) return;
      event.preventDefault();
      if (isScrolling) return;

      isScrolling = true;
      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = Math.max(0, SECTION_IDS.indexOf(activeSection));
      const targetIndex = currentIndex + direction;

      if (targetIndex >= 0 && targetIndex < SECTION_IDS.length) {
        const target = sectionRefs.current[targetIndex];
        target?.scrollIntoView({ behavior: 'smooth' });
      }

      window.setTimeout(() => {
        isScrolling = false;
      }, 750);
    };

    root.addEventListener('wheel', onWheel, { passive: false });
    return () => root.removeEventListener('wheel', onWheel);
  }, [activeSection, modalProject]);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    root.style.overflow = modalProject ? 'hidden' : 'auto';
  }, [modalProject]);

  const scrollToSection = (id) => {
    const targetIndex = SECTION_IDS.indexOf(id);
    sectionRefs.current[targetIndex]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-off-white text-dark-slate font-sans min-h-screen">
      <div className="md:grid md:grid-cols-12">
        <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />

        <main ref={mainRef} className="md:col-span-9 h-screen overflow-y-scroll scroll-snap-y no-scrollbar">
          <Hero
            ref={(el) => (sectionRefs.current[0] = el)}
            showExplore={showExplore}
            setShowExplore={setShowExplore}
            scrollToSection={scrollToSection}
          />

          <Skills ref={(el) => (sectionRefs.current[1] = el)} />

          <Projects
            ref={(el) => (sectionRefs.current[2] = el)}
            projects={projects}
            setModalProject={setModalProject}
          />

          <About ref={(el) => (sectionRefs.current[3] = el)} />
        </main>
      </div>

      <ProjectModal modalProject={modalProject} setModalProject={setModalProject} />
    </div>
  );
}

export default App;
