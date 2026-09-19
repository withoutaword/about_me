import { Link, useParams } from 'react-router-dom';
import patents from 'virtual:patents';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarkdownRenderer from '../components/MarkdownRenderer';
import PageMeta from '../components/PageMeta';

const PatentDetail = () => {
  const { slug } = useParams();
  const patent = patents.find((item) => item.slug === slug);

  if (!patent) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)]">
        <Navbar />
        <main className="article-not-found">
          <h1>Patent Not Found</h1>
          <Link to="/patents">Back to Patents</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <PageMeta title={patent.title} description={patent.summary} />
      <Navbar />
      <main className="article-detail">
        <Link className="article-back" to="/patents">← Back to Patents</Link>
        <header className="article-header">
          <p className="articles-kicker">{patent.patentNumber}</p>
          <h1>{patent.title}</h1>
          {patent.officialUrl && (
            <div className="project-links">
              <a href={patent.officialUrl} target="_blank" rel="noreferrer">View on Google Patents ↗</a>
            </div>
          )}
        </header>
        <MarkdownRenderer>{patent.content}</MarkdownRenderer>
      </main>
      <Footer />
    </div>
  );
};

export default PatentDetail;
