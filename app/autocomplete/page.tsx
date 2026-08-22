'use client';
import { useState, useEffect } from 'react';
import styles from './Autocomplete.module.css';

type User = {
  id: number;
  name: string;
}

export default function Autocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // don't fetch if query is empty
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // debounce — wait 500ms after user stops typing
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users?name_like=${query}`
        );

        if (!res.ok) throw new Error('Failed to fetch');

        const data: User[] = await res.json();
        setResults(data);

      } catch (err) {
        setError('Something went wrong. Try again.');
      } finally {
        setLoading(false);
      }
    }, 500);

    // cleanup — cancel previous timer on every keystroke
    return () => clearTimeout(timer);

  }, [query]);

  return (
    <div className={styles.container}>

      {/* Input */}
      <input
        className={styles.input}
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search users..."
      />

      {/* Dropdown */}
      {query && (
        <div className={styles.dropdown}>

          {loading && (
            <p className={styles.message}>Loading...</p>
          )}

          {error && (
            <p className={styles.error}>{error}</p>
          )}

          {!loading && !error && results.length === 0 && (
            <p className={styles.message}>No results found</p>
          )}

          {!loading && !error && results.map(user => (
            <div
              key={user.id}
              className={styles.option}
              onClick={() => {
                setQuery(user.name);
                setResults([]);
              }}
            >
              {user.name}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}