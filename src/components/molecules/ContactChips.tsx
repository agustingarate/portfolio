'use client';

import { useEffect, useRef, useState } from 'react';
import type { IconName } from '@/content/portfolio.types';
import { Icon } from '@/components/atoms/Icon';
import styles from './ContactChips.module.css';

type ContactChip = {
  label: string;
  value: string;
  href: string;
  icon: IconName;
  external?: boolean;
};

async function copyText(value: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Use the legacy copy path when the browser denies Clipboard API access.
    }
  }

  const input = document.createElement('textarea');
  input.value = value;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  input.remove();
  if (!copied) throw new Error('Copy command failed');
}

export function ContactChips({
  items,
  labels,
}: {
  items: readonly ContactChip[];
  labels: { label: string; copied: string; unableToCopy: string; copy: string };
}) {
  const [message, setMessage] = useState('');
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCopy = (item: ContactChip) => {
    clearTimeout(resetTimer.current);
    setMessage(`${item.label} ${labels.copied}`);
    resetTimer.current = setTimeout(() => setMessage(''), 2500);

    void copyText(item.value).catch(() => {
      setMessage(`${labels.unableToCopy} ${item.label}`);
    });
  };

  return (
    <div className={styles.list} aria-label={labels.label}>
      {items.map((item) => {
        const copied = message === `${item.label} ${labels.copied}`;
        const failed = message === `${labels.unableToCopy} ${item.label}`;
        const copyLabel = item.icon === 'mail' ? 'email' : item.label;
        const feedback = copied
          ? labels.copied
          : failed
            ? labels.unableToCopy
            : '';

        return (
          <div
            className={`${styles.chip} ${copied ? styles.copied : ''} ${failed ? styles.failed : ''}`}
            key={item.label}
          >
            <a
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              data-contact-icon={item.icon}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </a>
            <button
              type="button"
              onClick={() => handleCopy(item)}
              aria-label={
                copied
                  ? `${copyLabel} ${labels.copied}`
                  : `${labels.copy} ${copyLabel}`
              }
              title={copied ? labels.copied : `${labels.copy} ${copyLabel}`}
            >
              <Icon name={copied ? 'check' : 'copy'} size={16} />
            </button>
            <span className={styles.feedback} aria-hidden="true">
              {feedback}
            </span>
          </div>
        );
      })}
      <span className="sr-only" role="status" aria-live="polite">
        {message}
      </span>
    </div>
  );
}
