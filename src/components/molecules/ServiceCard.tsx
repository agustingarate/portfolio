import type { Service } from '@/content/portfolio.types';
import styles from './ServiceCard.module.css';

const serviceSignals: Record<string, readonly [string, string]> = {
  mobile: ['IOS', 'ANDROID'],
  web: ['WEB', 'INTERFAZ'],
  backend: ['SISTEMAS', 'OPERACIONES'],
  automation: ['ENTRADA', 'ACCIÓN'],
  rocket: ['IDEA', 'MVP'],
};

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [signalFrom, signalTo] = serviceSignals[service.icon] ?? [
    'IDEA',
    'PRODUCTO',
  ];

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
      </div>
      <div className={styles.signal} aria-hidden="true">
        <span>{signalFrom}</span>
        <i />
        <span>{signalTo}</span>
      </div>
    </article>
  );
}
