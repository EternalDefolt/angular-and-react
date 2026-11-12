import styles from './ProgressBar.module.css';

function ProgressBar({ done, total }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const fillClass = [styles.fill, percent === 100 && styles.complete].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>
          Выполнено {done} из {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className={styles.track}>
        <div className={fillClass} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
