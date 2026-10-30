'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import styles from './Modal.module.css';

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    return () => {
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusableElements?.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <main className={styles.container}>
      <h1>Modal</h1>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            <h2 id="modal-title">Example modal</h2>
            <p>This modal closes with Escape or an outside click.</p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
