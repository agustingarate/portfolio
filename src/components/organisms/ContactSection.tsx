'use client';
import { useState } from 'react';
import Script from 'next/script';
import type { ProjectType, SocialLink } from '@/content/portfolio.types';
import type { Locale } from '@/lib/i18n';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { Icon } from '@/components/atoms/Icon';
import { Reveal } from '@/components/molecules/Reveal';
import styles from './ContactSection.module.css';
export function ContactSection({
  title,
  description,
  projectTypes,
  socials,
  turnstileSiteKey,
  labels,
  locale,
}: {
  title: string;
  description: string;
  projectTypes: readonly ProjectType[];
  socials: readonly SocialLink[];
  turnstileSiteKey: string;
  locale: Locale;
  labels: {
    projectType: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    website: string;
    sending: string;
    sent: string;
    error: string;
    submit: string;
  };
}) {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setIsSubmitting(true);
    setStatus(labels.sending);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          message: form.get('message'),
          projectType: form.get('project_type'),
          website: form.get('website'),
          turnstileToken: form.get('cf-turnstile-response'),
        }),
      });
      if (!response.ok) throw new Error('contact-request-failed');
      formElement.reset();
      setStatus(labels.sent);
    } catch {
      setStatus(labels.error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contacto" className={styles.section}>
      <Script
        id="turnstile-api"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <Container className={styles.container}>
        <Reveal>
          <div className={styles.grid}>
            <div className={styles.intro}>
              <span className={styles.index} aria-hidden="true">
                06 /
              </span>
              <h2>{title}</h2>
              <p className={styles.description}>{description}</p>
              <div className={styles.socials}>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    data-contact-icon={social.icon}
                  >
                    <Icon name={social.icon} size={20} />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
            <form onSubmit={submit}>
              <fieldset>
                <legend>{labels.projectType}</legend>
                <div className={styles.types}>
                  {projectTypes.map((type, index) => (
                    <label key={type.value}>
                      <input
                        type="radio"
                        name="project_type"
                        value={type.value}
                        defaultChecked={index === 0}
                      />
                      <span>{type.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={styles.fieldLabel} htmlFor="name">
                {labels.name}
              </label>
              <input
                required
                id="name"
                name="name"
                placeholder={labels.namePlaceholder}
                autoComplete="name"
              />
              <label className={styles.fieldLabel} htmlFor="email">
                {labels.email}
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                placeholder={labels.emailPlaceholder}
                autoComplete="email"
              />
              <label className={styles.fieldLabel} htmlFor="message">
                {labels.message}
              </label>
              <textarea
                required
                id="message"
                name="message"
                rows={4}
                placeholder={labels.messagePlaceholder}
              />
              <label className={styles.honeypot} htmlFor="website">
                {labels.website}
              </label>
              <input
                className={styles.honeypot}
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
              <div
                className={`${styles.turnstile} cf-turnstile`}
                data-sitekey={turnstileSiteKey}
                data-theme="light"
                data-language={locale}
              />
              <Button type="submit" wide disabled={isSubmitting}>
                {isSubmitting ? labels.sending : labels.submit}
              </Button>
              <p className={styles.status} aria-live="polite">
                {status}
              </p>
            </form>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
