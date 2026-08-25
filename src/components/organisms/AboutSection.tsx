import { Container } from '@/components/atoms/Container';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { Reveal } from '@/components/molecules/Reveal';
import styles from './Sections.module.css';
export function AboutSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section id="sobre-mi" className={styles.section}>
      <Container>
        <Reveal>
          <SectionHeading title={title} description={description} />
        </Reveal>
      </Container>
    </section>
  );
}
