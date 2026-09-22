import { Link, useParams } from 'react-router-dom';
import articles from 'virtual:articles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarkdownRenderer from '../components/MarkdownRenderer';
import PageMeta from '../components/PageMeta';
import ArticleShare from '../components/ArticleShare';

const formatDate = (date) => date
  ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
  : 'Date unavailable';

const decodeRouteSlug = (slug) => {
  if (!slug) return slug;

  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const decodedSlug = decodeRouteSlug(slug);
  const index = articles.findIndex((article) => article.slug === decodedSlug);
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

  const listedArticles = articles.filter((item) => item.listed);
  const listedIndex = listedArticles.findIndex((item) => item.slug === decodedSlug);
  const newerArticle = listedIndex > 0 ? listedArticles[listedIndex - 1] : null;
  const olderArticle = listedIndex >= 0 && listedIndex < listedArticles.length - 1
    ? listedArticles[listedIndex + 1]
    : null;

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
          <ArticleShare article={article} />
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
