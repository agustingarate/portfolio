import styles from './SectionHeading.module.css';
export function SectionHeading({
  title,
  description,
  index,
}: {
  title: string;
  description?: string;
  index?: string;
}) {
  return (
    <div className={styles.heading}>
      {index && (
        <span className={styles.index} aria-hidden="true">
          {index} /
        </span>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
