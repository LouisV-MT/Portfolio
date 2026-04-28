import { useTranslation } from 'react-i18next';
import i18nConfig from '../i18n';

export default function Sidebar({ activeSection, scrollToSection }) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n?.language || 'en';
    const nextLang = currentLang.startsWith('en') ? 'fr' : 'en';
    i18nConfig.changeLanguage(nextLang);
  };

  const renderToggle = () => (
    <button onClick={toggleLanguage} className="flex items-center justify-center text-xs md:text-sm font-bold text-dark-slate bg-off-white hover:bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm transition-all">
      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 text-mid-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
      {(i18n?.language || 'en').startsWith('en') ? 'FR' : 'EN'}
    </button>
  );

  const renderSocials = () => (
    // INCREASED: space-x-5 sm:space-x-6 (was space-x-3)
    <div className="flex justify-center space-x-5 sm:space-x-6 md:space-x-5">
      <a href="https://www.linkedin.com/in/minh-triet-vu/" target="_blank" rel="noreferrer" className="text-mid-slate hover:text-dark-slate transition-colors" title="LinkedIn">
        <svg className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
      </a>
      <a href="https://github.com/LouisV-MT" target="_blank" rel="noreferrer" className="text-mid-slate hover:text-dark-slate transition-colors" title="GitHub">
        <svg className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path></svg>
      </a>
      <a href="/images/Minh Triet Vu - CV.pdf" target="_blank" rel="noreferrer" className="text-mid-slate hover:text-dark-slate transition-colors" title="Download CV">
        <svg className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></svg>
      </a>
    </div>
  );

  return (
    <aside className="md:col-span-3 md:sticky md:top-0 md:h-screen p-4 sm:p-6 md:p-8 bg-beige shadow-lg md:shadow-none z-[100]">
      <div className="flex flex-col h-full">
        
        {/* TOP HEADER */}
        <div className="flex flex-row justify-between items-center w-full mb-4 md:flex-col md:mb-12">
          
          {/* LEFT SIDE: Image + Socials */}
          {/* INCREASED: gap-6 sm:gap-8 (was gap-3) */}
          <div className="flex items-center gap-6 sm:gap-8 md:gap-0">
            <img
              src="/images/LouisV.jpg"
              alt="Minh Triet Vu"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-40 md:h-40 rounded-full border-2 md:border-4 border-dark-slate shadow-md object-cover flex-shrink-0"
            />
            <div className="md:hidden">
              {renderSocials()}
            </div>
          </div>

          {/* RIGHT SIDE: Language Toggle */}
          <div className="md:hidden">
            {renderToggle()}
          </div>
          
        </div>

        {/* NAVIGATION: Fixed Tab Bar on Mobile, Vertical list on Desktop */}
        <nav className="fixed bottom-0 left-0 w-full bg-white md:bg-transparent border-t-2 border-gray-200 md:border-none shadow-[0_-10px_30px_rgba(0,0,0,0.1)] md:shadow-none z-[100] pb-6 pt-3 px-2 md:relative md:p-0 md:flex-grow md:flex md:items-center">
          <ul className="flex justify-around w-full md:max-w-none md:flex-col md:justify-start md:space-y-4 md:w-fit mx-auto">
            <li>
              <button onClick={() => scrollToSection('hero')} className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 font-semibold transition-all ${activeSection === 'hero' ? 'text-dark-slate' : 'text-mid-slate hover:text-dark-slate'}`}>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                <span className="text-[11px] sm:text-sm md:text-base">{t('nav.home')}</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('skills')} className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 font-semibold transition-all ${activeSection === 'skills' ? 'text-dark-slate' : 'text-mid-slate hover:text-dark-slate'}`}>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="text-[11px] sm:text-sm md:text-base">{t('nav.skills')}</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('projects')} className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 font-semibold transition-all ${activeSection === 'projects' ? 'text-dark-slate' : 'text-mid-slate hover:text-dark-slate'}`}>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7.5a.5.5 0 01-.5.5H5.5a.5.5 0 01-.5-.5V5z"></path></svg>
                <span className="text-[11px] sm:text-sm md:text-base">{t('nav.projects')}</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('about')} className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 font-semibold transition-all ${activeSection === 'about' ? 'text-dark-slate' : 'text-mid-slate hover:text-dark-slate'}`}>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <span className="text-[11px] sm:text-sm md:text-base whitespace-nowrap">{t('nav.about')}</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions (Hidden on Mobile) */}
        <div className="hidden md:flex md:flex-col md:items-center md:mt-auto md:gap-4 md:border-t md:border-mid-slate/20 md:pt-5">
          {renderToggle()}
          {renderSocials()}
        </div>

      </div>
    </aside>
  );
}