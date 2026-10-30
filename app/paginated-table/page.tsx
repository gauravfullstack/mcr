'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '../usertable/api/userApi';
import type { User } from '../usertable/types/user';

export default function PaginatedTablePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  const pageCount = Math.ceil(users.length / pageSize);
  const pageUsers = users.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <main>
      <h1>Paginated User Table</h1>
      <label>
        Rows per page
        <select
          value={pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {pageUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        disabled={page <= 1}
        onClick={() => setPage((currentPage) => currentPage - 1)}
      >
        Previous
      </button>
      <span>
        {' '}
        Page {page} of {pageCount}{' '}
      </span>
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => setPage((currentPage) => currentPage + 1)}
      >
        Next
      </button>
    </main>
  );
}
