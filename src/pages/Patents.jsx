import { Link } from 'react-router-dom';
import patents from 'virtual:patents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Patents = () => (
  <div className="min-h-screen bg-[var(--bg-color)]">
    <Navbar />
    <main className="articles-page">
      <header className="articles-hero">
        <p className="articles-kicker">INVENTIONS</p>
        <h1>Patents</h1>
        <p>Selected inventions in recommendation systems, data storage, and digital experiences.</p>
      </header>

      <div className="patent-list">
        {patents.map((patent) => (
          <article className="patent-card" key={patent.slug}>
            <div className="patent-number">{patent.patentNumber}</div>
            <div>
              <h2>
                <Link to={`/patents/${encodeURIComponent(patent.slug)}`}>{patent.title}</Link>
              </h2>
              <p>{patent.summary}</p>
              <div className="patent-actions">
                <Link to={`/patents/${encodeURIComponent(patent.slug)}`}>View Patent</Link>
                {patent.officialUrl && (
                  <a href={patent.officialUrl} target="_blank" rel="noreferrer">Google Patents ↗</a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Patents;
