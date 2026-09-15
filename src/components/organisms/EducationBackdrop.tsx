import styles from './EducationTimeline.module.css';

/** Content-led backdrop: the institution and study period become the artwork. */
export function EducationBackdrop() {
  return (
    <div className={styles.archiveBackdrop} aria-hidden="true">
      <span className={styles.archiveMark}>UTN</span>
      <span className={styles.archivePeriod}>2018—2023</span>
      <span className={styles.archiveCaption}>INGENIERÍA / SISTEMAS</span>
    </div>
  );
}
