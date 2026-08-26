import { Container } from '@/components/atoms/Container';
import { Chip } from '@/components/atoms/Chip';
import { Icon } from '@/components/atoms/Icon';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { Reveal } from '@/components/molecules/Reveal';
import styles from './Sections.module.css';
export function AboutSection({
  title,
  description,
  location,
}: {
  title: string;
  description: string;
  location: string;
}) {
  return (
    <section id="sobre-mi" className={styles.section}>
      <Container>
        <Reveal>
          <div className={styles.location}>
            <Chip tone="tonal">
              <Icon name="location" size={15} />
              {location}
            </Chip>
          </div>
          <SectionHeading title={title} description={description} />
        </Reveal>
      </Container>
    </section>
  );
}
