'use client';
import { useState } from 'react';
import styles from './FileUpload.module.css';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 2;

export default function FileUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only JPG, PNG, WEBP allowed.';
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File size must be under ${MAX_SIZE_MB}MB.`;
    }
    return null;
  };

  const handleFile = (file: File) => {
    // reset previous state
    setError(null);
    setPreview(null);

    const validationError = validate(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // generate preview URL
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={styles.container}>

      {/* File Input */}
      <label className={styles.label}>
        Click to upload image
        <input
          type="file"
          className={styles.input}
          accept="image/*"
          onChange={handleChange}
        />
      </label>

      {/* Error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Preview */}
      {preview && (
        <div className={styles.preview}>
          <img src={preview} alt="preview" />
          <span className={styles.fileName}>{fileName}</span>
        </div>
      )}

    </div>
  );
}