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

export function ContactChips({ items }: { items: readonly ContactChip[] }) {
  const [message, setMessage] = useState('');
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCopy = (item: ContactChip) => {
    clearTimeout(resetTimer.current);
    setMessage(`${item.label} copiado`);
    resetTimer.current = setTimeout(() => setMessage(''), 2500);

    void copyText(item.value).catch(() => {
      setMessage(`No se pudo copiar ${item.label}`);
    });
  };

  return (
    <div className={styles.list} aria-label="Contacto rápido">
      {items.map((item) => {
        const copied = message === `${item.label} copiado`;
        const failed = message === `No se pudo copiar ${item.label}`;
        const copyLabel = item.icon === 'mail' ? 'email' : item.label;
        const feedback = copied ? 'Copiado' : failed ? 'No se pudo copiar' : '';

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
                copied ? `${copyLabel} copiado` : `Copiar ${copyLabel}`
              }
              title={copied ? 'Copiado' : `Copiar ${copyLabel}`}
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
