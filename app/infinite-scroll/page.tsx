'use client';

import { useEffect, useRef, useState } from 'react';
import { fetchUsers } from '../usertable/api/userApi';
import type { User } from '../usertable/types/user';

const PAGE_SIZE = 5;

export default function InfiniteScrollPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users.'));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisibleCount((count) => Math.min(count + PAGE_SIZE, users.length));
      }
    });

    const bottom = bottomRef.current;
    if (bottom) observer.observe(bottom);

    return () => observer.disconnect();
  }, [users.length]);

  if (error) return <p role="alert">{error}</p>;
  if (!users.length) return <p>Loading users...</p>;

  return (
    <main>
      <h1>Infinite Scroll</h1>
      <ul>
        {users.slice(0, visibleCount).map((user) => (
          <li key={user.id}>
            {user.name} — {user.role}
          </li>
        ))}
      </ul>
      {visibleCount < users.length ? (
        <div ref={bottomRef}>Loading more users...</div>
      ) : (
        <p>All users loaded.</p>
      )}
    </main>
  );
}
