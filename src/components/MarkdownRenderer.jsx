import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { headingTextFromChildren } from '../utils/markdownHeadings';

const MarkdownRenderer = ({ children, headings = [] }) => {
  const headingIds = new Map(headings.map(({ id, line }) => [line, id]));
  const heading = (level) => ({ children: headingChildren, node }) => {
    const text = headingTextFromChildren(headingChildren);
    const id = headingIds.get(node?.position?.start?.line);
    const Heading = `h${level}`;

    return (
      <Heading id={id}>
        {headingChildren}
        {id && (
          <a className="heading-anchor" href={`#${id}`} aria-label={`Link to ${text}`}>#</a>
        )}
      </Heading>
    );
  };

  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: heading(2),
          h3: heading(3),
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
};

export default MarkdownRenderer;
