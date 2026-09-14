import { portfolioContent } from '@/content/portfolio';
import { portfolioContentEn } from '@/content/portfolio.en';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const localeContent = {
  es: portfolioContent,
  en: portfolioContentEn,
} as const;

export function getLocaleContent(locale: Locale) {
  return localeContent[locale];
}

export function localePath(locale: Locale) {
  return locale === 'en' ? '/en' : '/';
}
