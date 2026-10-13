
'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from './parent.module.css';

type User = {
  id: number;
  name: string;
  role: string;
};

export default function Autocomplete() {
  const [query, setQuery] = useState('');
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce search by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/users.json');

        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }

        const users: User[] = await res.json();
        setUserData(users);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Something went wrong'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Close dropdown when clicking outside
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter users using the debounced query
  const search = debouncedQuery.trim().toLowerCase();

  const filteredUsers = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
  );

  const isDebouncing =
    query.trim().toLowerCase() !==
    debouncedQuery.trim().toLowerCase();

  const showDropdown =
    isOpen && query.trim().length > 0 && !isDebouncing;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
  };

  const handleSelect = (user: User) => {
    setQuery(user.name);
    setDebouncedQuery(user.name);
    setIsOpen(false);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Autocomplete Feature</h1>

      <div ref={containerRef}>
        <div className={style.inputWrapper}>
          <input
            type="text"
            placeholder="Search by name or role..."
            className={style.input}
            value={query}
            onChange={handleChange}
            onFocus={() => {
              if (query.trim()) {
                setIsOpen(true);
              }
            }}
            role="combobox"
            aria-expanded={showDropdown}
            aria-autocomplete="list"
          />
        </div>

        {error && <p role="alert">{error}</p>}

        {loading && <p>Loading users...</p>}

        {showDropdown && !loading && !error && (
          <div className={style.suggestionContainer}>
            {filteredUsers.length > 0 ? (
              <ul role="listbox">
                {filteredUsers.map((user) => (
                  <li key={user.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={false}
                      onClick={() => handleSelect(user)}
                    >
                      <span>{user.name}</span>
                      <small> — {user.role}</small>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
