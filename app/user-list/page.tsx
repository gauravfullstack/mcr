'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '../usertable/api/userApi';
import type { User } from '../usertable/types/user';

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.role}
          </li>
        ))}
      </ul>
    </main>
  );
}
