import { forwardRef } from 'react';
import TypeIt from 'typeit-react';

const Hero = forwardRef(({ showExplore, setShowExplore, scrollToSection }, ref) => {
  return (
    <section id="hero" ref={ref} className="h-screen flex items-center justify-center scroll-snap-start p-8 md:p-12">
      <div>
        <div className="space-y-2 font-mono text-2xl md:text-3xl tracking-tight">
          <h1>
            <TypeIt
              options={{ speed: 50, startDelay: 900, cursor: true, afterComplete: (instance) => instance.destroy() }}
              getBeforeInit={(instance) => {
                instance.type('<span class="text-mid-slate">String</span> <span class="text-dark-slate">name</span> = <span class="text-beige bg-dark-slate rounded-md px-2 py-1">"Minh Triet Vu"</span><span class="text-mid-slate">;</span>', { parse: true });
                return instance;
              }}
            />
          </h1>
          <h2>
            <TypeIt
              options={{ speed: 50, startDelay: 2500, cursor: true, afterComplete: (instance) => instance.destroy() }}
              getBeforeInit={(instance) => {
                instance.type('<span class="text-dark-slate">$title</span> = <span class="text-beige bg-dark-slate rounded-md px-2 py-1">\'Full-Stack Developer\'</span><span class="text-mid-slate">;</span>', { parse: true });
                return instance;
              }}
            />
          </h2>
        </div>

        <div className="mt-8 font-mono text-lg text-mid-slate max-w-3xl">
          <TypeIt
            options={{ speed: 30, startDelay: 4500, cursor: false, afterComplete: () => setShowExplore(true) }}
            getBeforeInit={(instance) => {
              instance
                .type('<p><span class="text-gray-400">/*</span></p>', { parse: true })
                .break()
                .type('<p class="pl-4">From the precision of a sushi knife to the logic of clean code, I build dedicated and detail-oriented web applications. I\'m a full-stack developer based in Montreal, currently on the Dean\'s List at John Abbott College.</p>', { parse: true })
                .break()
                .type('<p><span class="text-gray-400">*/</span></p>', { parse: true });
              return instance;
            }}
          />
        </div>

        <div className="mt-12 w-full flex justify-center">
          <button
            type="button"
            onClick={() => scrollToSection('skills')}
            className={`bg-dark-slate text-off-white font-semibold px-8 py-3 rounded-md hover:opacity-90 shadow-lg transition-opacity ${
              showExplore ? 'opacity-100' : 'opacity-0'
            }`}
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
