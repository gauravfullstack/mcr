'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SearchableDropdown.module.css';

const options = ['Apple', 'Banana', 'Blueberry', 'Grape', 'Orange', 'Strawberry'];

export default function SearchableDropdownPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className={styles.container} ref={containerRef}>
      <h1>Searchable Dropdown</h1>
      <button type="button" onClick={() => setIsOpen((open) => !open)}>
        {selected || 'Select a fruit'}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <ul>
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(option);
                      setSearch('');
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))
            ) : (
              <li>No results found.</li>
            )}
          </ul>
        </div>
      )}
    </main>
  );
}
