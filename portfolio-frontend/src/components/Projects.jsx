import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ensurePublicPath } from '../utils/helpers';

const Projects = forwardRef(({ projects, setModalProject }, ref) => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr') || false;
  
  const carouselRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });
  
  // NEW: State to track which project is currently visible
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateScrollState = () => {
      // 1. Update left/right button visibility
      setCanScroll({
        left: carousel.scrollLeft > 0,
        right: Math.ceil(carousel.scrollLeft + carousel.clientWidth) < carousel.scrollWidth,
      });

      // 2. Calculate which card is currently active for the dots
      const itemWidth = carousel.firstElementChild?.clientWidth || 340;
      const gap = 32; // Tailwind's gap-8 is 32px
      const newIndex = Math.round(carousel.scrollLeft / (itemWidth + gap));
      setActiveIndex(newIndex);
    };

    updateScrollState();
    carousel.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    return () => {
      carousel.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [projects.length]);

  // Scroll by arrows
  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.firstElementChild;
    const amount = (firstCard?.clientWidth || 340) + 32;
    carousel.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  // Scroll directly to a specific dot
  const scrollToProject = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const firstCard = carousel.firstElementChild;
    const amount = (firstCard?.clientWidth || 340) + 32;
    carousel.scrollTo({ left: index * amount, behavior: 'smooth' });
  };

  return (
    // Note the pb-28 md:pb-12 to protect content from the mobile tab bar!
    <section id="projects" ref={ref} className="min-h-screen flex flex-col md:snap-start p-8 md:p-12 pt-24 pb-28 md:pb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-dark-slate mb-8 md:mb-12">{t('nav.projects')}</h2>

      <div className="relative group">
        
        {/* Left Arrow Button (Desktop only) */}
        <button type="button" onClick={() => scrollCarousel(-1)} disabled={!canScroll.left} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white shadow-xl rounded-full p-3 text-dark-slate hover:bg-beige transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-default hidden sm:flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        {/* Carousel Container */}
        <div ref={carouselRef} className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scroll-smooth p-2 no-scrollbar">
          {projects.map((project) => (
            <div key={project.id} className="w-[85vw] md:w-96 shrink-0 snap-center bg-white rounded-lg border border-gray-200 shadow-md hover:scale-[1.02] transition-transform duration-300 flex flex-col min-h-[420px]">
              <img className="rounded-t-lg h-52 w-full object-cover border-b border-gray-100" src={ensurePublicPath(project.image)} alt={project.title} />
              <div className="p-6 flex flex-col flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-dark-slate">{project.title}</h5>
                
                <p className="mb-4 font-normal text-mid-slate leading-relaxed">
                  {isFrench && project.cardDescription_fr ? project.cardDescription_fr : project.cardDescription}
                </p>
                
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={() => setModalProject(project)}
                    className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-center text-white bg-dark-slate rounded-lg hover:bg-mid-slate transition-colors"
                  >
                    {t('modal.viewDetails')}
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button (Desktop only) */}
        <button type="button" onClick={() => scrollCarousel(1)} disabled={!canScroll.right} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white shadow-xl rounded-full p-3 text-dark-slate hover:bg-beige transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-default hidden sm:flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      {/* NEW: Interactive Mobile Scroll Markers (Dots) */}
      <div className="flex justify-center items-center mt-6 gap-2">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToProject(idx)}
            aria-label={`Go to project ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'bg-dark-slate w-6 md:w-8' 
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

    </section>
  );
});

Projects.displayName = 'Projects';
export default Projects;