'use client';
import { useState } from 'react';
import styles from './Tabs.module.css';

const tabs = [
  { id: 1, label: 'Profile', content: 'This is your Profile tab.' },
  { id: 2, label: 'Settings', content: 'This is your Settings tab.' },
  { id: 3, label: 'Notifications', content: 'This is your Notifications tab.' },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeContent = tabs.find(t => t.id === activeTab)?.content;

  return (
    <div className={styles.container}>

      {/* Tab Headers */}
      <div className={styles.tabList}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.panel}>
        {activeContent}
      </div>

    </div>
  );
}