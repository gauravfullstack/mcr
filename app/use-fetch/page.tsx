'use client';

import { useFetch } from '../hooks/useFetch';

type User = {
  id: number;
  name: string;
  role: string;
};

export default function UseFetchPage() {
  const { data: users, loading, error } = useFetch<User[]>('/users.json');

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error.message}</p>;

  return (
    <main>
      <h1>useFetch</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.name} — {user.role}
          </li>
        ))}
      </ul>
    </main>
  );
}
