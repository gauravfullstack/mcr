'use client';

import { useState } from 'react';
import styles from './SidebarMenu.module.css';

const menuItems = [
  {
    label: 'Dashboard',
    children: ['Overview', 'Analytics'],
  },
  {
    label: 'Settings',
    children: ['Profile', 'Security'],
  },
  {
    label: 'Help',
    children: ['Documentation', 'Support'],
  },
];

export default function SidebarMenuPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setExpandedItems((expanded) =>
      expanded.includes(label)
        ? expanded.filter((item) => item !== label)
        : [...expanded, label],
    );
  };

  return (
    <main className={styles.sidebar}>
      <h1>Menu</h1>
      <nav aria-label="Sidebar menu">
        {menuItems.map((item) => {
          const isExpanded = expandedItems.includes(item.label);

          return (
            <section className={styles.section} key={item.label}>
              <button
                className={styles.parent}
                type="button"
                aria-expanded={isExpanded}
                onClick={() => toggleItem(item.label)}
              >
                {item.label}
                <span>{isExpanded ? '−' : '+'}</span>
              </button>
              {isExpanded && (
                <ul className={styles.children}>
                  {item.children.map((child) => (
                    <li key={child}>{child}</li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </nav>
    </main>
  );
}
