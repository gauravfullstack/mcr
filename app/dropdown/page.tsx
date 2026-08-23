'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

const options = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'GraphQL'];

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // outside click to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // toggle select
  const toggleOption = (option: string) => {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(s => s !== option)  // deselect
        : [...prev, option]               // select
    );
  };

  // search filter
  const filtered = options.filter(o =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '40px' }}>
      <h2>Dropdown Component</h2>
      <div className={styles.container} ref={containerRef}>

        {/* Trigger Button */}
        <button
          className={styles.trigger}
          onClick={() => setIsOpen(prev => !prev)}
        >
          {selected.length === 0
            ? 'Select options...'
            : `${selected.length} selected`
          }
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className={styles.dropdown}>

            {/* Search */}
            <input
              className={styles.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              autoFocus
            />

            {/* Options */}
            {filtered.length === 0 ? (
              <p className={styles.empty}>No results</p>
            ) : (
              filtered.map(option => (
                <div
                  key={option}
                  className={`${styles.option} ${selected.includes(option) ? styles.selected : ''}`}
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={selected.includes(option)}
                  />
                  {option}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}