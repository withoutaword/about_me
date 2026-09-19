import { useEffect } from 'react';
import { SITE_URL } from '../config/site';

const DEFAULT_DESCRIPTION = 'Bruce W is an AI engineer focused on agent systems, evaluation, and AI infrastructure.';

const PageMeta = ({ title, description = DEFAULT_DESCRIPTION }) => {
  useEffect(() => {
    const pageTitle = title ? `${title} · Bruce W` : 'Bruce W · AI Engineer';
    const canonicalUrl = `${SITE_URL}${window.location.pathname}`;
    document.title = pageTitle;

    const setMeta = (selector, attribute, value, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description]);

  return null;
};

export default PageMeta;
