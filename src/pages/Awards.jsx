import { Link } from 'react-router-dom';
import awards from 'virtual:awards';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';

const formatDate = (date) => date
  ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(date))
  : 'Date unavailable';

const Awards = () => (
  <div className="min-h-screen bg-[var(--bg-color)]">
    <PageMeta title="Awards" description="Professional recognition for Bruce W's engineering ownership, technical execution, and impact." />
    <Navbar />
    <main className="articles-page">
      <header className="articles-hero">
        <p className="articles-kicker">RECOGNITION</p>
        <h1>Awards</h1>
        <p>Recognition for engineering ownership, technical execution, and professional impact.</p>
      </header>

      <div className="award-grid">
        {awards.map((award) => (
          <article className="award-card" key={award.slug}>
            {award.cover && <img src={award.cover} alt="" loading="lazy" />}
            <div className="award-card-body">
              <time dateTime={award.date || undefined}>{formatDate(award.date)}</time>
              <h2><Link to={`/awards/${encodeURIComponent(award.slug)}`}>{award.title}</Link></h2>
              {award.organization && <p className="award-organization">{award.organization}</p>}
              <p>{award.summary}</p>
              <Link className="award-link" to={`/awards/${encodeURIComponent(award.slug)}`}>View Award →</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Awards;
