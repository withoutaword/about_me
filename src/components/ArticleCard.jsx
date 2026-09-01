import { Link } from 'react-router-dom';

const formatDate = (date) => date
  ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(date))
  : 'Date unavailable';

const ArticleCard = ({ article }) => (
  <article className="article-card">
    {article.cover && (
      <img className="article-card-cover" src={article.cover} alt="" />
    )}
    <div className="article-card-body">
      <div className="article-meta">
        <time dateTime={article.date || undefined}>{formatDate(article.date)}</time>
        <span>·</span>
        <span>{article.readingTime} min read</span>
      </div>
      <h2>
        <Link to={`/articles/${encodeURIComponent(article.slug)}`}>{article.title}</Link>
      </h2>
      <p>{article.summary}</p>
      {article.tags.length > 0 && (
        <div className="article-tags">
          {article.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      )}
    </div>
  </article>
);

export default ArticleCard;
