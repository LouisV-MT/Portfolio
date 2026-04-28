import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next'; // Import the hook

const About = forwardRef((props, ref) => {
  const { t } = useTranslation(); // Initialize the hook

  return (
    <section id="about" ref={ref} className="min-h-screen flex flex-col md:snap-start p-8 md:p-12 pt-24 pb-28 md:pb-12">
      <h2 className="text-4xl font-bold text-dark-slate mb-8">{t('about.title')}</h2>
      <div className="space-y-6 text-lg text-mid-slate max-w-3xl">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p className="font-semibold text-dark-slate">{t('about.p3')}</p>
        <p>{t('about.p4')}</p>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;