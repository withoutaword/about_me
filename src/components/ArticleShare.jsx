import { useEffect, useRef, useState } from 'react';
import { toCanvas } from 'html-to-image';
import QRCode from 'qrcode';
import MarkdownRenderer from './MarkdownRenderer';
import { SITE_URL } from '../config/site';

const MAX_PAGE_HEIGHT = 10000;

const formatDate = (date) => date
  ? new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
  : 'Date unavailable';

const safeFilename = (value) => value
  .replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase();

const downloadCanvas = (canvas, filename) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => {
    if (!blob) {
      reject(new Error('Unable to create image file.'));
      return;
    }

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(objectUrl);
    resolve();
  }, 'image/png');
});

const waitForImages = async (node) => {
  const images = [...node.querySelectorAll('img')];
  images.forEach((image) => {
    image.loading = 'eager';
  });

  await Promise.all(images.map((image) => {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    });
  }));
};

const writeClipboard = async (value) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement('textarea');
  input.value = value;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  input.remove();
  if (!copied) throw new Error('Copy command failed.');
};

const ArticleShare = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [qrCode, setQrCode] = useState('');
  const shareSourceRef = useRef(null);
  const articleUrl = `${SITE_URL}/articles/${encodeURIComponent(article.slug)}`;

  useEffect(() => {
    QRCode.toDataURL(articleUrl, {
      width: 180,
      margin: 1,
      color: { dark: '#111827', light: '#ffffff' },
    }).then(setQrCode).catch(() => setQrCode(''));
  }, [articleUrl]);

  const copyLink = async () => {
    try {
      await writeClipboard(articleUrl);
      setStatus('Link copied.');
    } catch {
      setStatus('Copy failed. Please copy the URL from your browser.');
    }
  };

  const shareLink = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({
        title: article.title,
        text: article.summary,
        url: articleUrl,
      });
      setStatus('Share panel opened.');
    } catch (error) {
      if (error.name !== 'AbortError') setStatus('Sharing was not available.');
    }
  };

  const generateLongImage = async () => {
    if (!shareSourceRef.current || isGenerating) return;

    setIsGenerating(true);
    setStatus('Preparing article images…');

    try {
      if (document.fonts?.ready) await document.fonts.ready;
      await waitForImages(shareSourceRef.current);
      setStatus('Rendering long image…');

      const canvas = await toCanvas(shareSourceRef.current, {
        backgroundColor: '#f8f6f1',
        cacheBust: true,
        pixelRatio: 1.2,
        style: {
          position: 'static',
          top: 'auto',
          left: 'auto',
          zIndex: 'auto',
          transform: 'none',
        },
      });
      const pageCount = Math.ceil(canvas.height / MAX_PAGE_HEIGHT);
      const filename = safeFilename(article.title) || 'article';

      for (let page = 0; page < pageCount; page += 1) {
        const sourceY = page * MAX_PAGE_HEIGHT;
        const pageHeight = Math.min(MAX_PAGE_HEIGHT, canvas.height - sourceY);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageHeight;
        const context = pageCanvas.getContext('2d');
        context.fillStyle = '#f8f6f1';
        context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        context.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          pageHeight,
          0,
          0,
          canvas.width,
          pageHeight,
        );
        const suffix = pageCount > 1 ? `-${page + 1}-of-${pageCount}` : '';
        await downloadCanvas(pageCanvas, `${filename}${suffix}.png`);
      }

      setStatus(
        pageCount > 1
          ? `${pageCount} long-image pages downloaded.`
          : 'Long image downloaded.',
      );
    } catch (error) {
      console.error('Unable to generate article image:', error);
      setStatus('Unable to generate the image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button className="article-share-trigger" type="button" onClick={() => setIsOpen(true)}>
        Share article
      </button>

      {isOpen && (
        <div className="share-dialog-backdrop" role="presentation" onClick={() => setIsOpen(false)}>
          <section
            aria-labelledby="share-dialog-title"
            aria-modal="true"
            className="share-dialog"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close sharing options"
              className="share-dialog-close"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <p className="share-dialog-kicker">SHARE</p>
            <h2 id="share-dialog-title">Share this article</h2>
            <p>Send the permanent link or download a reading-friendly long image.</p>
            <div className="share-dialog-actions">
              <button type="button" onClick={shareLink}>System share</button>
              <button type="button" onClick={copyLink}>Copy link</button>
              <button type="button" disabled={isGenerating} onClick={generateLongImage}>
                {isGenerating ? 'Generating…' : 'Download long image'}
              </button>
            </div>
            <p aria-live="polite" className="share-dialog-status">{status}</p>
          </section>
        </div>
      )}

      <article aria-hidden="true" className="article-share-source" inert="" ref={shareSourceRef}>
        <header className="article-share-header">
          <p>BRUCE W · AI ARCHITECTURE</p>
          <h1>{article.title}</h1>
          <div>
            <span>{formatDate(article.date)}</span>
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
          <p>{article.summary}</p>
        </header>
        <MarkdownRenderer>{article.content}</MarkdownRenderer>
        <footer className="article-share-footer">
          <div>
            <strong>Bruce W</strong>
            <span>{articleUrl}</span>
          </div>
          {qrCode && <img src={qrCode} alt="" />}
        </footer>
      </article>
    </>
  );
};

export default ArticleShare;
