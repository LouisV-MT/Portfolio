import { forwardRef } from 'react';

const About = forwardRef((props, ref) => {
  return (
    <section id="about" ref={ref} className="h-screen flex flex-col scroll-snap-start p-8 md:p-12 pt-24">
      <h2 className="text-4xl font-bold text-dark-slate mb-8">About Me</h2>
      <div className="space-y-6 text-lg text-mid-slate max-w-3xl">
        <p>
          I started my development experience while I was employed at Taiga Motors. I worked on intricate systems as a battery assembler,
          where even one error may have catastrophic effects. I learned the value of following procedures and communicating clearly from this,
          and it has a direct impact on how I approach software architecture and teamwork.
        </p>
        <p>
          I am working full-time as a sushi chef and attending night classes at John Abbott. Writing clean, efficient, and error-free code is
          based on the same concepts I learnt when working in the kitchen: extreme precision, constancy under pressure, and a profound respect
          for the process.
        </p>
        <p className="font-semibold text-dark-slate">
          I&apos;ve managed to combine this practical experience with my academics, where I&apos;ve continuously made the Dean&apos;s List.
        </p>
        <p>When I&apos;m not coding, you can usually find me exploring Montreal&apos;s food scene, enjoy a short gaming break or playing DnD.</p>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
