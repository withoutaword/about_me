import { Link, useParams } from 'react-router-dom';
import awards from 'virtual:awards';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarkdownRenderer from '../components/MarkdownRenderer';
import PageMeta from '../components/PageMeta';

const formatDate = (date) => date
  ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(date))
  : 'Date unavailable';

const AwardDetail = () => {
  const { slug } = useParams();
  const award = awards.find((item) => item.slug === slug);

  if (!award) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)]">
        <Navbar />
        <main className="article-not-found">
          <h1>Award Not Found</h1>
          <Link to="/awards">Back to Awards</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <PageMeta title={award.title} description={award.summary} />
      <Navbar />
      <main className="article-detail">
        <Link className="article-back" to="/awards">← Back to Awards</Link>
        <header className="article-header">
          <div className="article-meta">
            <time dateTime={award.date || undefined}>{formatDate(award.date)}</time>
            {award.organization && <><span>·</span><span>{award.organization}</span></>}
          </div>
          <h1>{award.title}</h1>
        </header>
        <MarkdownRenderer>{award.content}</MarkdownRenderer>
      </main>
      <Footer />
    </div>
  );
};

export default AwardDetail;
