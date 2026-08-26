import type { Experience } from '@/content/portfolio.types';
import { Chip } from '@/components/atoms/Chip';
import { Icon } from '@/components/atoms/Icon';
import styles from './ExperienceItem.module.css';

export function ExperienceItem({
  item,
  active,
}: {
  item: Experience;
  active?: boolean;
}) {
  return (
    <article className={`${styles.item} ${active ? styles.active : ''}`}>
      <span className={styles.node} aria-hidden="true" />
      <p className={styles.period}>{item.period}</p>
      <h3>{item.role}</h3>
      <p className={styles.company}>
        @{' '}
        <a
          href={item.companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.company} (abre una nueva pestaña)`}
        >
          {item.company}
          <Icon name="external-link" size={14} />
        </a>
      </p>
      <p className={styles.summary}>{item.summary}</p>
      <ul>
        {item.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className={styles.technologies}>
        {item.technologies.map((technology) => (
          <Chip key={technology}>{technology}</Chip>
        ))}
      </div>
    </article>
  );
}
