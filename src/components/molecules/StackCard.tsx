import type { StackCategory } from "@/content/portfolio.types";
import { Icon } from "@/components/atoms/Icon";
import { Chip } from "@/components/atoms/Chip";
import styles from "./StackCard.module.css";
export function StackCard({ category }: { category: StackCategory }) {
  return <article className={styles.card}><div className={`${styles.icon} ${styles[`icon${category.tone[0].toUpperCase()}${category.tone.slice(1)}`]}`}><Icon name={category.icon}/></div><h3>{category.title}</h3><div className={styles.chips}>{category.technologies.map((technology) => <Chip key={technology}>{technology}</Chip>)}</div></article>;
}
