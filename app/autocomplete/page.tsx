'use client';

import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import style from './Autocomplete.module.css';

type User = {
  id: number;
  name: string;
  role: string;
};

export default function Autocomplete() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      setUsers([]);
      setLoading(false);
      setError('');
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/users.json', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to fetch suggestions.');

        const allUsers: User[] = await response.json();
        setUsers(
          allUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(search) ||
              user.role.toLowerCase().includes(search),
          ),
        );
        setActiveIndex(-1);
      } catch (requestError) {
        if (requestError instanceof Error && requestError.name === 'AbortError') {
          return;
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Failed to fetch suggestions.',
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const selectUser = (user: User) => {
    setQuery(user.name);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && users.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index + 1) % users.length);
    } else if (event.key === 'ArrowUp' && users.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index <= 0 ? users.length - 1 : index - 1));
    } else if (event.key === 'Enter' && isOpen && activeIndex >= 0) {
      event.preventDefault();
      selectUser(users[activeIndex]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  return (
    <main className={style.container}>
      <h1>Autocomplete</h1>
      <input
        className={style.input}
        type="text"
        role="combobox"
        aria-label="Search users"
        aria-autocomplete="list"
        aria-expanded={isOpen && users.length > 0}
        aria-controls="user-suggestions"
        aria-activedescendant={
          activeIndex >= 0 ? `user-option-${users[activeIndex].id}` : undefined
        }
        placeholder="Search by name or role..."
        value={query}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {loading && <p className={style.message}>Loading...</p>}
      {error && <p className={style.error} role="alert">{error}</p>}

      {isOpen && !loading && !error && query.trim() && (
        <ul className={style.dropdown} id="user-suggestions" role="listbox">
          {users.length > 0 ? (
            users.map((user, index) => (
              <li
                className={`${style.option} ${activeIndex === index ? style.active : ''}`}
                id={`user-option-${user.id}`}
                key={user.id}
                role="option"
                aria-selected={activeIndex === index}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectUser(user)}
              >
                {user.name} — {user.role}
              </li>
            ))
          ) : (
            <li className={style.message}>No users found.</li>
          )}
        </ul>
      )}
    </main>
  );
}
