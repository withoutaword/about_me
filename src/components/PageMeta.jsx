import { useEffect } from 'react';

const DEFAULT_DESCRIPTION = 'Bruce W is an AI engineer focused on agent systems, evaluation, and AI infrastructure.';

const PageMeta = ({ title, description = DEFAULT_DESCRIPTION }) => {
  useEffect(() => {
    document.title = title ? `${title} · Bruce W` : 'Bruce W · AI Engineer';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);

  return null;
};

export default PageMeta;
