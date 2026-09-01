import { useMemo, useState } from 'react';
import articles from 'virtual:articles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';

const Articles = () => {
  const [activeTag, setActiveTag] = useState('All');
  const tags = useMemo(
    () => ['All', ...new Set(articles.flatMap((article) => article.tags))],
    [],
  );
  const visibleArticles = activeTag === 'All'
    ? articles
    : articles.filter((article) => article.tags.includes(activeTag));

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <Navbar />
      <main className="articles-page">
        <header className="articles-hero">
          <p className="articles-kicker">WRITING</p>
          <h1>Articles</h1>
          <p>Notes on technology, life, and ideas worth recording.</p>
        </header>

        {tags.length > 1 && (
          <div className="article-filters" aria-label="Filter articles by tag">
            {tags.map((tag) => (
              <button
                key={tag}
                className={activeTag === tag ? 'active' : ''}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="article-list">
          {visibleArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
