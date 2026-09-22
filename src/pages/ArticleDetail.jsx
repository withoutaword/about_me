import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import articles from 'virtual:articles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarkdownRenderer from '../components/MarkdownRenderer';
import PageMeta from '../components/PageMeta';
import ArticleShare from '../components/ArticleShare';
import { extractHeadings } from '../utils/markdownHeadings';

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

  useEffect(() => {
    if (!article || !window.location.hash) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [article]);

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
  const headings = extractHeadings(article.content);
  const handleTocClick = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${encodeURIComponent(id)}`);
  };

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

        <div className={headings.length > 1 ? 'article-reading-layout' : ''}>
          {headings.length > 1 && (
            <aside className="article-toc" aria-label="Table of contents">
              <details open>
                <summary>On this page</summary>
                <nav>
                  {headings.map((heading) => (
                    <a
                      className={`toc-level-${heading.level}`}
                      href={`#${heading.id}`}
                      key={heading.id}
                      onClick={(event) => handleTocClick(event, heading.id)}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </details>
            </aside>
          )}
          <MarkdownRenderer headings={headings}>{article.content}</MarkdownRenderer>
        </div>

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
