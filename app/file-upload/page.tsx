'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import styles from './FileUpload.module.css';

export default function FileUploadPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!preview || progress >= 100) return;

    const timer = setTimeout(() => {
      setProgress((currentProgress) => Math.min(currentProgress + 10, 100));
    }, 100);

    return () => clearTimeout(timer);
  }, [preview, progress]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setProgress(0);
  };

  return (
    <main className={styles.container}>
      <h1>File Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div className={styles.upload}>
          <img className={styles.preview} src={preview} alt="Selected image preview" />
          <progress value={progress} max="100" aria-label="Upload progress" />
          <span>{progress}%</span>
        </div>
      )}
    </main>
  );
}
