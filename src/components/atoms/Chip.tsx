import styles from './Chip.module.css';
export function Chip({
  children,
  tone = 'default',
  variant = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'tonal';
  variant?: 'default' | 'outline';
}) {
  return (
    <span
      className={`${styles.chip} ${tone === 'tonal' ? styles.tonal : ''} ${variant === 'outline' ? styles.outline : ''}`}
    >
      {children}
    </span>
  );
}
