import type { Service } from '@/content/portfolio.types';
import { Icon } from '@/components/atoms/Icon';
import styles from './ServiceCard.module.css';
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={`${styles.card} ${service.featured ? styles.featured : ''}`}
    >
      <div className={styles.title}>
        <Icon name={service.icon} size={32} />
        <h3>{service.title}</h3>
      </div>
      <p>{service.description}</p>
      {service.detail && <p className={styles.detail}>{service.detail}</p>}
    </article>
  );
}
