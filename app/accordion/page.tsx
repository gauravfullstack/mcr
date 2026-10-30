'use client';

import { useState } from 'react';
import styles from './Accordion.module.css';

const items = [
  {
    question: 'What is an accordion?',
    answer: 'An accordion shows and hides related content when a heading is selected.',
  },
  {
    question: 'Can I open more than one panel?',
    answer: 'It depends on the accordion behavior. This page demonstrates both options.',
  },
  {
    question: 'Can I use a keyboard to open a panel?',
    answer: 'Yes. Focus a panel button and press Enter or Space to toggle it.',
  },
];

export default function AccordionPage() {
  const [openSinglePanel, setOpenSinglePanel] = useState<number | null>(null);
  const [openMultiplePanels, setOpenMultiplePanels] = useState<number[]>([]);

  const toggleMultiplePanel = (index: number) => {
    setOpenMultiplePanels((openPanels) =>
      openPanels.includes(index)
        ? openPanels.filter((openPanel) => openPanel !== index)
        : [...openPanels, index],
    );
  };

  return (
    <main className={styles.container}>
      <h1>Accordion</h1>

      <section className={styles.section} aria-labelledby="single-accordion-title">
        <h2 id="single-accordion-title">Only one panel open</h2>
        {items.map((item, index) => {
          const isOpen = openSinglePanel === index;
          const buttonId = `single-accordion-button-${index}`;
          const panelId = `single-accordion-panel-${index}`;

          return (
            <div className={styles.item} key={item.question}>
              <h3 className={styles.itemHeading}>
                <button
                  className={styles.button}
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenSinglePanel(isOpen ? null : index)
                  }
                >
                  {item.question}
                </button>
              </h3>
              <div
                className={styles.panel}
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className={styles.section} aria-labelledby="multiple-accordion-title">
        <h2 id="multiple-accordion-title">Several panels open</h2>
        {items.map((item, index) => {
          const isOpen = openMultiplePanels.includes(index);
          const buttonId = `multiple-accordion-button-${index}`;
          const panelId = `multiple-accordion-panel-${index}`;

          return (
            <div className={styles.item} key={item.question}>
              <h3 className={styles.itemHeading}>
                <button
                  className={styles.button}
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleMultiplePanel(index)}
                >
                  {item.question}
                </button>
              </h3>
              <div
                className={styles.panel}
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
