import type { Service } from '@/content/portfolio.types';
import { Container } from '@/components/atoms/Container';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { ServiceCard } from '@/components/molecules/ServiceCard';
import { Reveal } from '@/components/molecules/Reveal';
import styles from './Sections.module.css';
export function ServicesSection({
  title,
  description,
  items,
  children,
}: {
  title: string;
  description: string;
  items: readonly Service[];
  children?: React.ReactNode;
}) {
  return (
    <section id="servicios" className={styles.section}>
      <Container>
        <Reveal>
          <SectionHeading title={title} description={description} />
        </Reveal>
        <div className={styles.services}>
          {items.map((service, index) => (
            <Reveal key={service.title}>
              <ServiceCard service={service} index={index + 1} />
            </Reveal>
          ))}
        </div>
      </Container>
      {children}
    </section>
  );
}
