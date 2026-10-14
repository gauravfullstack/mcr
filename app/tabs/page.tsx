'use client';

import { useEffect, useState } from 'react';
import styles from './Tabs.module.css';

type Tab = {
  id: number;
  label: string;
  actionLabel: string;
  modalTitle: string;
  modalContent: string;
};

const tabs: Tab[] = [
  {
    id: 1,
    label: 'Profile',
    actionLabel: 'Delete Modal',
    modalTitle: 'Delete Profile',
    modalContent: 'Are you sure you want to delete your profile?',
  },
  {
    id: 2,
    label: 'Settings',
    actionLabel: 'Delete Modal',
    modalTitle: 'Delete Settings',
    modalContent: 'Are you sure you want to delete these settings?',
  },
  {
    id: 3,
    label: 'Notifications',
    actionLabel: 'Delete Modal',
    modalTitle: 'Delete Notifications',
    modalContent: 'Are you sure you want to delete all notifications?',
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

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

  return (
    <div className={styles.container}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

            <button onClick={() => setIsModalOpen(true)}>
              {activeTabData.actionLabel}
            </button>
          </>
        )}
      </div>

      {isModalOpen && activeTabData && (
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