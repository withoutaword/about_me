import { Link, useParams } from 'react-router-dom';
import projects from 'virtual:projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarkdownRenderer from '../components/MarkdownRenderer';
import PageMeta from '../components/PageMeta';

const formatDate = (date) => date
  ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(date))
  : 'Project record';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)]">
        <Navbar />
        <main className="article-not-found">
          <h1>Project Not Found</h1>
          <Link to="/projects">Back to Projects</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <PageMeta title={project.title} description={project.summary} />
      <Navbar />
      <main className="article-detail">
        <Link className="article-back" to="/projects">← Back to Projects</Link>
        <header className="article-header">
          <div className="article-meta">
            <time dateTime={project.date || undefined}>{formatDate(project.date)}</time>
          </div>
          <h1>{project.title}</h1>
          {project.techStack.length > 0 && (
            <div className="article-tags">
              {project.techStack.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          )}
          {(project.github || project.demo) && (
            <div className="project-links">
              {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>}
            </div>
          )}
          {project.cover && <img className="article-cover" src={project.cover} alt="" />}
        </header>
        <MarkdownRenderer>{project.content}</MarkdownRenderer>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
