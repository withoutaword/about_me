import { Link, useParams } from 'react-router-dom';
import articles from 'virtual:articles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarkdownRenderer from '../components/MarkdownRenderer';
import PageMeta from '../components/PageMeta';

const formatDate = (date) => date
  ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
  : 'Date unavailable';

const ArticleDetail = () => {
  const { slug } = useParams();
  const index = articles.findIndex((article) => article.slug === slug);
  const article = articles[index];

  if (!article) {
    return (
      <div className="min-h-screen bg-[var(--bg-color)]">
        <Navbar />
        <main className="article-not-found">
          <h1>Article Not Found</h1>
          <Link to="/articles">Back to Articles</Link>
        </main>
      </div>
    );
  }

  const newerArticle = index > 0 ? articles[index - 1] : null;
  const olderArticle = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <PageMeta title={article.title} description={article.summary} />
      <Navbar />
      <main className="article-detail">
        <Link className="article-back" to="/articles">← Back to Articles</Link>
        <header className="article-header">
          <div className="article-meta">
            <time dateTime={article.date || undefined}>{formatDate(article.date)}</time>
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
          <h1>{article.title}</h1>
          {article.tags.length > 0 && (
            <div className="article-tags">
              {article.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}
          {article.cover && <img className="article-cover" src={article.cover} alt="" />}
        </header>

        <MarkdownRenderer>{article.content}</MarkdownRenderer>

        <nav className="article-pagination" aria-label="Previous and next articles">
          {newerArticle
            ? <Link to={`/articles/${encodeURIComponent(newerArticle.slug)}`}>← {newerArticle.title}</Link>
            : <span />}
          {olderArticle && (
            <Link to={`/articles/${encodeURIComponent(olderArticle.slug)}`}>{olderArticle.title} →</Link>
          )}
        </nav>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
