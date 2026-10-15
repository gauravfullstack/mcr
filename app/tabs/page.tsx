'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import styles from './Tabs.module.css';

type ModalTab = {
  id: number;
  label: string;
  actionLabel: string;
  modalTitle: string;
  modalContent: string;
  type: 'modal';
};

type UploadTab = {
  id: number;
  label: string;
  type: 'upload';
};

type Tab = ModalTab | UploadTab;

const tabs: Tab[] = [
  {
    id: 1,
    label: 'Profile',
    actionLabel: 'Delete Modal',
    modalTitle: 'Delete Profile',
    modalContent: 'Are you sure you want to delete your profile?',
    type: 'modal',
  },
  {
    id: 2,
    label: 'Settings',
    actionLabel: 'Delete Modal',
    modalTitle: 'Delete Settings',
    modalContent: 'Are you sure you want to delete these settings?',
    type: 'modal',
  },
  {
    id: 3,
    label: 'File upload',
    type: 'upload',
  },
];

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const maxSizeBytes = 2 * 1024 * 1024;

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;

    setUploadError(null);
    setPreview(null);
    setFileName(null);

    if (!allowedTypes.has(file.type)) {
      setUploadError('Only JPG, PNG, WEBP allowed.');
      return;
    }

    if (file.size > maxSizeBytes) {
      setUploadError('File size must be under 2MB.');
      return;
    }

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id);
              setIsModalOpen(false);
            }}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        {activeTabData && (
          <>
            <p>{activeTabData.label} tab is active.</p>

            {activeTabData.type === 'upload' ? (
              <div className={styles.uploadContainer}>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={styles.uploadInput}
                  onChange={handleFileChange}
                  aria-describedby={uploadError ? 'upload-error' : undefined}
                />
                <label className={styles.uploadLabel} htmlFor="image-upload">
                  Click to upload image
                </label>

                {uploadError && (
                  <p
                    className={styles.uploadError}
                    id="upload-error"
                    role="alert"
                  >
                    {uploadError}
                  </p>
                )}

                {preview && fileName && (
                  <div className={styles.uploadPreview}>
                    <img src={preview} alt={`${fileName} preview`} />
                    <span className={styles.fileName}>{fileName}</span>
                  </div>
                )}
              </div>
            ) : (
              <button type="button" onClick={() => setIsModalOpen(true)}>
                {activeTabData.actionLabel}
              </button>
            )}
          </>
        )}
      </div>

      {isModalOpen && activeTabData?.type === 'modal' && (
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px',
              position: 'relative',
              minWidth: '300px',
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
              }}
            >
              ✕
            </button>

            <h2 id="modal-title">{activeTabData.modalTitle}</h2>
            <p>{activeTabData.modalContent}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button
                onClick={() => {
                  console.log(`Deleted: ${activeTabData.label}`);
                  setIsModalOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}