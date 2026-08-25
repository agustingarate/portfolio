import styles from './SectionHeading.module.css';
export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.heading}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
