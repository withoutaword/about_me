const markdownText = (value) => value
  .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/<[^>]+>/g, '')
  .replace(/[*_~`]/g, '')
  .trim();

const headingSlug = (value) => markdownText(value)
  .normalize('NFKC')
  .toLocaleLowerCase()
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .trim()
  .replace(/[\s-]+/g, '-');

export const createHeadingSlugger = () => {
  const counts = new Map();

  return (value) => {
    const base = headingSlug(value) || 'section';
    const count = counts.get(base) || 0;
    counts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };
};

export const extractHeadings = (markdown) => {
  const slug = createHeadingSlugger();
  const headings = [];
  const pattern = /^(#{2,3})\s+(.+?)\s*#*\s*$/gm;

  for (const match of markdown.matchAll(pattern)) {
    const text = markdownText(match[2]);
    const line = markdown.slice(0, match.index).split('\n').length;
    if (text) headings.push({ level: match[1].length, text, id: slug(text), line });
  }

  return headings;
};

export const headingTextFromChildren = (children) => {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(headingTextFromChildren).join('');
  if (children?.props?.children) return headingTextFromChildren(children.props.children);
  return '';
};
