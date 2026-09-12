import type { Service } from '@/content/portfolio.types';
import { ServiceSculpture } from './ServiceSculpture';
import styles from './ServiceCard.module.css';
export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <article
      className={`${styles.card} ${service.featured ? styles.featured : ''}`}
    >
      <span className={styles.number} aria-hidden="true">
        0{index}
      </span>
      <ServiceSculpture kind={service.icon} />
      <div className={styles.copy}>
        <div className={styles.title}>
          <h3>{service.title}</h3>
        </div>
        <p>{service.description}</p>
        {service.detail && <p className={styles.detail}>{service.detail}</p>}
      </div>
    </article>
  );
}
