import type { StackCategory, Technology } from "@/content/portfolio.types";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { StackCard } from "@/components/molecules/StackCard";
import { Reveal } from "@/components/molecules/Reveal";
import styles from "./StackSection.module.css";
export function StackSection({ title, categories, marquee }: { title: string; categories: readonly StackCategory[]; marquee: readonly Technology[] }) {
  const repeated = [...marquee, ...marquee];
  return <><section id="stack" className={styles.section}><Container><SectionHeading title={title}/><div className={styles.grid}>{categories.map((category, index) => <Reveal key={category.title} delay={index * 100}><StackCard category={category}/></Reveal>)}</div></Container></section>
    <section className={styles.marquee} aria-label="Tecnologías destacadas"><div className={styles.fadeLeft}/><div className={styles.fadeRight}/><div className={styles.track}>{repeated.map((technology, index) => <div className={styles.technology} key={`${technology.label}-${index}`} aria-hidden={index >= marquee.length}><Icon name={technology.icon} size={34}/><span>{technology.label}</span></div>)}</div></section>
  </>;
}
