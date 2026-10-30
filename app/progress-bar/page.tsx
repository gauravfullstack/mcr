'use client';

import { useState } from 'react';
import styles from './ProgressBar.module.css';

export default function ProgressBarPage() {
  const [progress, setProgress] = useState(60);

  return (
    <main className={styles.container}>
      <h1>Progress Bar</h1>
      <label>
        Progress: {progress}%
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(event) => setProgress(Number(event.target.value))}
        />
      </label>
      <div
        className={styles.track}
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
    </main>
  );
}
