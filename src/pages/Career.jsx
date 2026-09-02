import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';

const careers = [
  {
    company: 'vivo Mobile Technology',
    role: 'Software Architect · AI Engineering',
    dates: 'Aug 2021 – Present',
    summary: 'Building production AI systems across agent evaluation, language models, recommendation, and engineering productivity.',
    impact: [
      'Architected an Agent Evaluation Platform supporting offline and training-time evaluation workflows.',
      'Built 6+ reusable Agent Skills and reduced benchmark integration time from 2 days to approximately 10 minutes.',
      'Developed recommendation and language-model capabilities with cross-functional product and data science teams.',
    ],
    focus: ['Agent Systems', 'AI Evaluation', 'LLM', 'Recommendation'],
  },
  {
    company: 'Shenzhen Fenqile Technology',
    role: 'Software Architect',
    dates: 'Jan 2018 – Nov 2020',
    summary: 'Designed commerce infrastructure for targeted promotions and data-driven marketing operations.',
    impact: [
      'Built and maintained an e-commerce coupon system supporting targeted promotions, redemption tracking, and real-time analytics.',
      'Integrated the platform with existing commerce infrastructure, payment gateways, and data synchronization workflows.',
    ],
    focus: ['System Architecture', 'E-commerce', 'Data Systems'],
  },
  {
    company: 'IBM',
    role: 'Senior Software Developer',
    dates: 'Apr 2015 – Dec 2017',
    summary: 'Delivered secure enterprise software for financial-services environments.',
    impact: [
      'Contributed to a credit-card platform covering transaction processing, risk assessment, and customer operations.',
      'Designed highly available integrations across APIs, databases, and third-party services.',
      'Mentored junior engineers and promoted collaborative engineering practices.',
    ],
    focus: ['Enterprise Systems', 'FinTech', 'High Availability'],
  },
  {
    company: 'Chow Tai Fook Group',
    role: 'Software Engineer',
    dates: 'Nov 2011 – Mar 2015',
    summary: 'Developed and maintained customer-facing web experiences for a major retail brand.',
    impact: [
      'Contributed to a responsive, feature-rich website revamp using PHP, C#, MySQL, HTML/CSS, and JavaScript.',
    ],
    focus: ['Web Engineering', 'PHP', 'C#', 'MySQL'],
  },
];

const Career = () => (
  <div className="min-h-screen bg-[var(--bg-color)]">
    <PageMeta title="Career" description="Bruce W's engineering career across AI systems, fintech, commerce, and web platforms." />
    <Navbar />
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <header className="text-center mb-16">
          <p className="articles-kicker">EXPERIENCE</p>
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-color)] mt-3">Career</h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto mt-4">
            More than a decade of building AI, financial, commerce, and web systems.
          </p>
        </header>

        <div className="max-w-4xl mx-auto border-l border-[var(--border-color)] ml-2 md:ml-auto">
          {careers.map((career) => (
            <article className="career-entry" key={`${career.company}-${career.dates}`}>
              <span className="career-dot" aria-hidden="true" />
              <p className="career-date">{career.dates}</p>
              <h2>{career.company}</h2>
              <p className="career-role">{career.role}</p>
              <p className="career-summary">{career.summary}</p>
              <h3>Selected Impact</h3>
              <ul>
                {career.impact.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-5">
                {career.focus.map((item) => <span className="career-tag" key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Career;
