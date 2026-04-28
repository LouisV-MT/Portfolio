import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

const SKILLS = [
  { title: 'Languages', items: ['Java', 'PHP', 'JavaScript', 'HTML','Python', 'CSS', 'SQL'] },
  { title: 'Frontend', items: ['React', 'Bootstrap', 'jQuery & Ajax', 'Thymeleaf', 'Razor Pages (ASP.Net)', 'Django'] },
  { title: 'Backend', items: ['Spring Boot', 'Node.js', 'Express'] },
  { title: 'Databases', items: ['MySQL', 'MongoDB', 'JPA'] },
  { title: 'Hosting & DevOps', items: ['AWS (EC2, S3)', 'Docker', 'Render', 'XAMPP'] },
  { title: 'Tools & Methods', items: ['Git & GitHub', 'Postman', 'IntelliJ, VSCode', 'Agile, Scrum, Kanban', 'JUnit, Javadoc', 'n8n','Gemini'] },
];

const Skills = forwardRef((props, ref) => {
  const { t } = useTranslation();

  return (
    <section id="skills" ref={ref} className="min-h-screen flex flex-col md:snap-start p-8 md:p-12 pt-24 pb-28 md:pb-12">
      <h2 className="text-4xl font-bold text-dark-slate mb-12">{t('skills.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-lg">
        {SKILLS.map((group) => (
          <div key={group.title}>
            <h3 className="font-bold text-xl text-dark-slate mb-4 border-b-2 border-mid-slate pb-2">
              {t(`skills.categories.${group.title}`)}
            </h3>
            <ul className="space-y-2 text-mid-slate">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
export default Skills;