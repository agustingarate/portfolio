import type { Service } from '@/content/portfolio.types';
import { servicePath, serviceSlugs } from '@/content/service-pages';
import type { Locale } from '@/lib/i18n';
import { Icon } from '@/components/atoms/Icon';
import styles from './ServiceCard.module.css';

export function ServiceCard({
  service,
  index,
  locale,
}: {
  service: Service;
  index: number;
  locale: Locale;
}) {
  const [signalFrom, signalTo] = service.signals;

  return (
    <article
      className={`${styles.card} ${service.featured ? styles.featured : ''}`}
      data-kind={service.icon}
    >
      <span className={styles.number} aria-hidden="true">
        0{index}
      </span>
      <div className={styles.copy}>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        {service.detail && <p className={styles.detail}>{service.detail}</p>}
        <a
          className={styles.more}
          href={servicePath(locale, serviceSlugs[index - 1])}
        >
          {locale === 'en' ? 'Learn more' : 'Ver más'}{' '}
          <Icon name="arrow-right" size={18} />
        </a>
      </div>
      <div className={styles.signal} aria-hidden="true">
        <span>{signalFrom}</span>
        <i />
        <span>{signalTo}</span>
      </div>
    </article>
  );
}
