'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import styles from './ShareButton.module.css';

const shareText = 'Conocé el portfolio de Agustin Garate.';

function currentUrl() {
  const url = new URL(window.location.href);
  url.hash = '';
  return url.toString();
}

export function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleShare = async () => {
    const url = currentUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, text: shareText, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
      }
    }
    setIsOpen((open) => !open);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setMessage('Enlace copiado');
    } catch {
      setMessage('No se pudo copiar el enlace');
    }
  };

  const url = typeof window === 'undefined' ? '' : currentUrl();
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);

  return (
    <div className={styles.share}>
      <Button
        type="button"
        variant="secondary"
        aria-expanded={isOpen}
        aria-controls="share-options"
        onClick={handleShare}
      >
        Compartir
      </Button>
      {isOpen && (
        <div id="share-options" className={styles.options}>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={`https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          <a
            href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <button type="button" onClick={handleCopy}>
            Copiar enlace
          </button>
          {message && <span role="status">{message}</span>}
        </div>
      )}
    </div>
  );
}
