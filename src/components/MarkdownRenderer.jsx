import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

const MarkdownRenderer = ({ children }) => (
  <div className="article-prose">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children: linkText, href, ...props }) => href?.startsWith('/')
          ? <Link {...props} to={href}>{linkText}</Link>
          : <a {...props} href={href} target="_blank" rel="noreferrer">{linkText}</a>,
        img: ({ alt, ...props }) => <img {...props} alt={alt || ''} loading="lazy" />,
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
);

export default MarkdownRenderer;
