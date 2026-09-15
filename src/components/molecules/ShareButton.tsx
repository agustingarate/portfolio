'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import styles from './ShareButton.module.css';

function currentUrl() {
  const url = new URL(window.location.href);
  url.hash = '';
  return url.toString();
}

export function ShareButton({
  labels,
  tone = 'default',
}: {
  labels: {
    button: string;
    text: string;
    copyLink: string;
    linkCopied: string;
    unableToCopy: string;
  };
  tone?: 'default' | 'inverse';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleShare = async () => {
    const url = currentUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: labels.text,
          url,
        });
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
      setMessage(labels.linkCopied);
    } catch {
      setMessage(labels.unableToCopy);
    }
  };

  const url = typeof window === 'undefined' ? '' : currentUrl();
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(labels.text);

  return (
    <div
      className={`${styles.share} ${tone === 'inverse' ? styles.inverse : ''}`}
    >
      <Button
        type="button"
        variant="secondary"
        aria-expanded={isOpen}
        aria-controls="share-options"
        onClick={handleShare}
      >
        {labels.button}
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
            {labels.copyLink}
          </button>
          {message && <span role="status">{message}</span>}
        </div>
      )}
    </div>
  );
}
