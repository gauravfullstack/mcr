'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Tabs.module.css';

const tabs = [
  { id: 'profile', label: 'Profile', content: 'Profile tab content.' },
  { id: 'settings', label: 'Settings', content: 'Settings tab content.' },
  { id: 'billing', label: 'Billing', content: 'Billing tab content.' },
];

function TabsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab =
    tabs.find((tab) => tab.id === searchParams.get('tab')) ?? tabs[0];

  const selectTab = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <main className={styles.container}>
      <h1>Tabs</h1>
      <div className={styles.tabList} role="tablist" aria-label="Account">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`${tab.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeTab.id === tab.id}
            aria-controls={`${tab.id}-panel`}
            className={styles.tab}
            onClick={() => selectTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${activeTab.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeTab.id}-tab`}
        className={styles.panel}
      >
        {activeTab.content}
      </div>
    </main>
  );
}

export default function TabsPage() {
  return (
    <Suspense fallback={null}>
      <TabsContent />
    </Suspense>
  );
}
