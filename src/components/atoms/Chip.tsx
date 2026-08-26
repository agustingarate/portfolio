import styles from './Chip.module.css';
export function Chip({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'tonal';
}) {
  return (
    <span className={`${styles.chip} ${tone === 'tonal' ? styles.tonal : ''}`}>
      {children}
    </span>
  );
}
