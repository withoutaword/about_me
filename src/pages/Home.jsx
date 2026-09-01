import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CV_URL } from '../config/site';

const capabilities = [
  {
    title: 'Agent Systems',
    description: 'Designing practical agent workflows that turn complex model operations into reliable engineering systems.',
  },
  {
    title: 'Model Evaluation',
    description: 'Building extensible evaluation infrastructure for offline testing and training-time feedback loops.',
  },
  {
    title: 'AI Infrastructure',
    description: 'Improving model training and inference workflows through automation, reusable tools, and clear boundaries.',
  },
];

const Home = () => (
  <div className="min-h-screen bg-[var(--bg-color)]">
    <Navbar />
    <main>
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-color)] to-[var(--bg-secondary)]" />
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-[12%] w-72 h-72 bg-[var(--primary-color)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-[var(--secondary-color)]/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.24em] text-[var(--primary-color)] mb-5">AI ENGINEER · AGENT SYSTEMS</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-[var(--text-color)]">
              Building reliable systems for models and agents.
            </h1>
            <p className="max-w-2xl mt-7 text-lg md:text-xl leading-relaxed text-[var(--text-muted)]">
              I’m Bruce W, an AI engineer focused on agent systems, model evaluation, and training infrastructure—turning research ideas into tools that work in practice.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link className="primary-cta" to="/projects">View Projects</Link>
              <a className="secondary-cta" href={CV_URL} target="_blank" rel="noreferrer">View CV ↗</a>
              <Link className="secondary-cta" to="/career">Explore Career</Link>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-12 text-sm text-[var(--text-muted)]">
              <span><strong className="text-[var(--text-color)]">vivo AI Lab</strong> · 2021–Present</span>
              <span><strong className="text-[var(--text-color)]">IBM</strong> · Software Engineering</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24">
        <div className="section-heading">
          <p>WHAT I DO</p>
          <h2>Engineering AI beyond the demo.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {capabilities.map((capability, index) => (
            <article className="capability-card" key={capability.title}>
              <span>0{index + 1}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="brand-panel">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-[var(--primary-color)]">SELECTED WORK</p>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-color)] mt-3">Systems, lessons, and ideas.</h2>
            <p className="max-w-2xl text-[var(--text-muted)] leading-relaxed mt-5">
              Explore implementation-focused project notes, then read the longer-form ideas behind how I approach technology and work.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link className="primary-cta" to="/projects">Selected Projects</Link>
            <Link className="secondary-cta" to="/patents">View Patents</Link>
            <Link className="secondary-cta" to="/awards">View Awards</Link>
            <Link className="secondary-cta" to="/articles">Read Articles</Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Home;
