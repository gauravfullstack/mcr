'use client';

import { useCallback, useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

export default function UseOnClickOutsidePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const close = useCallback(() => setIsOpen(false), []);

  useOnClickOutside(containerRef, close);

  return (
    <main>
      <h1>useOnClickOutside</h1>
      {isOpen ? (
        <div
          ref={containerRef}
          style={{ padding: 24, border: '1px solid #888', width: 240 }}
        >
          Click outside this box to close it.
        </div>
      ) : (
        <button type="button" onClick={() => setIsOpen(true)}>
          Open box
        </button>
      )}
    </main>
  );
}
