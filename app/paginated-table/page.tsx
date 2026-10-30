'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '../usertable/api/userApi';
import type { SortKey, SortOrder, User } from '../usertable/types/user';

export default function PaginatedTablePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  const pageCount = Math.max(1, Math.ceil(users.length / pageSize));
  const sortedUsers = [...users].sort((a, b) => {
    const result =
      typeof a[sortKey] === 'number' && typeof b[sortKey] === 'number'
        ? a[sortKey] - b[sortKey]
        : String(a[sortKey]).localeCompare(String(b[sortKey]));

    return sortOrder === 'asc' ? result : -result;
  });
  const pageUsers = sortedUsers.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: SortKey) => {
    setSortOrder((order) =>
      sortKey === key && order === 'asc' ? 'desc' : 'asc',
    );
    setSortKey(key);
    setPage((currentPage) => Math.min(currentPage, pageCount));
  };

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
            const nextPageSize = Number(event.target.value);
            const nextPageCount = Math.max(
              1,
              Math.ceil(users.length / nextPageSize),
            );
            setPageSize(nextPageSize);
            setPage((currentPage) => Math.min(currentPage, nextPageCount));
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
            {(['id', 'name', 'role'] as const).map((key) => (
              <th
                key={key}
                aria-sort={
                  sortKey !== key
                    ? 'none'
                    : sortOrder === 'asc'
                      ? 'ascending'
                      : 'descending'
                }
              >
                <button type="button" onClick={() => handleSort(key)}>
                  {key === 'id' ? 'ID' : key === 'name' ? 'Name' : 'Role'}
                  {sortKey === key ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : ''}
                </button>
              </th>
            ))}
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
