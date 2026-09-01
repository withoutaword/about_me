import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ children }) => (
  <div className="article-prose">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children: linkText, ...props }) => (
          <a {...props} target="_blank" rel="noreferrer">{linkText}</a>
        ),
        img: ({ alt, ...props }) => <img {...props} alt={alt || ''} loading="lazy" />,
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
);

export default MarkdownRenderer;
