import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { CV_URL, EMAIL_URL, GITHUB_URL } from '../config/site';

const Footer = () => (
  <footer id="contact" className="bg-[var(--bg-secondary)] py-12 mt-20 transition-colors duration-300">
    <div className="container mx-auto px-6">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-color)]">Bruce W</h2>
          <p className="text-[var(--text-muted)] text-sm mt-2">AI Engineer · Agent Systems · AI Evaluation</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Footer navigation">
          <Link className="footer-link" to="/career">Career</Link>
          <Link className="footer-link" to="/projects">Projects</Link>
          <Link className="footer-link" to="/patents">Patents</Link>
          <Link className="footer-link" to="/awards">Awards</Link>
          <Link className="footer-link" to="/articles">Writing</Link>
          <a className="footer-link" href={CV_URL} target="_blank" rel="noreferrer">CV ↗</a>
          <a className="footer-link" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="footer-link" href={EMAIL_URL}>Email ↗</a>
        </nav>
        <ThemeSwitcher />
      </div>
      <div className="border-t border-[var(--border-color)] mt-8 pt-8 flex flex-col gap-2 sm:flex-row sm:justify-between text-[var(--text-muted)] text-sm">
        <p>© {new Date().getFullYear()} Bruce W.</p>
        <p>Built with React and Markdown.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
