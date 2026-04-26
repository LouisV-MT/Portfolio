import { ensurePublicPath } from '../utils/helpers';

export default function ProjectModal({ modalProject, setModalProject }) {
  if (!modalProject) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-slate/90 backdrop-blur-sm p-4 md:p-8" onClick={() => setModalProject(null)}>
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="absolute top-4 right-4 text-dark-slate bg-white/90 hover:bg-gray-100 z-10 p-2.5 rounded-full backdrop-blur transition-all shadow-md" onClick={() => setModalProject(null)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="flex-1 overflow-y-auto w-full p-6 md:p-10">
          <h3 className="text-3xl md:text-5xl font-bold text-dark-slate mb-6 text-center">{modalProject.title}</h3>
          <div className="mb-12 w-full">
            <img src={ensurePublicPath(modalProject.image)} alt={`Screenshot of ${modalProject.title}`} className="rounded-xl shadow-md w-full max-h-[500px] object-cover border border-gray-200" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
            <div className="lg:col-span-2 flex flex-col space-y-12">
              <div>
                <h4 className="font-bold text-2xl text-dark-slate mb-4 border-b-2 border-gray-100 pb-2">Overview</h4>
                <p className="text-lg text-mid-slate leading-relaxed">{modalProject.fullDescription}</p>
              </div>

              <div>
                <h4 className="font-bold text-2xl text-dark-slate mb-4 border-b-2 border-gray-100 pb-2">Key Features</h4>
                <ul className="list-disc pl-5 text-mid-slate space-y-2 text-lg leading-relaxed">
                  {modalProject.keyFeatures?.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col space-y-12">
              <div>
                <h4 className="font-bold text-2xl text-dark-slate mb-4 border-b-2 border-gray-100 pb-2">Tech Stack</h4>
                <div className="flex flex-wrap">
                  {modalProject.tech?.map((tech) => (
                    <span key={tech} className="bg-gray-200 text-dark-slate text-xs font-semibold px-2.5 py-1 rounded mr-2 mb-2 inline-block shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-2xl text-dark-slate mb-4 border-b-2 border-gray-100 pb-2">Project Links</h4>

                {modalProject.credentials && (
                  <div className="bg-off-white p-4 rounded-lg mb-4 text-sm border border-gray-200 shadow-inner">
                    <p className="font-bold text-dark-slate mb-2">Demo Credentials:</p>
                    <div className="space-y-1">
                      <p>
                        <span className="font-semibold text-mid-slate">Email:</span>
                        <br />
                        <span className="font-mono text-xs break-all">{modalProject.credentials.email}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-mid-slate">Password:</span>
                        <br />
                        <span className="font-mono text-xs break-all">{modalProject.credentials.password}</span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col w-full gap-3">
                  {modalProject.githubLinks?.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-dark-slate text-white px-4 py-2.5 rounded-lg hover:bg-mid-slate transition shadow-sm">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                      {link.label}
                    </a>
                  ))}

                  {modalProject.deepwikiLinks?.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-mid-slate text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition shadow-sm">
                      {link.label}
                    </a>
                  ))}

                  {modalProject.liveDemo && (
                    <a href={modalProject.liveDemo} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-beige text-dark-slate font-bold px-4 py-2.5 rounded-lg hover:opacity-80 transition shadow-sm">
                      Live Demo &rarr;
                    </a>
                  )}

                  {modalProject.pdfLink && (
                    <a href={ensurePublicPath(modalProject.pdfLink)} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full border-2 border-dark-slate text-dark-slate font-bold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm">
                      View Specs
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
