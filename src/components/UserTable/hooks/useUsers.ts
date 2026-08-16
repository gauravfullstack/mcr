import { useEffect, useMemo, useState } from 'react';

import { fetchUsers } from '../api/userApi';

import type {
  SortKey,
  SortOrder,
  User,
} from '../types/user';

const PAGE_SIZE = 3;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] =
    useState<SortKey>('name');

  const [sortOrder, setSortOrder] =
    useState<SortOrder>('asc');

  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch users
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchUsers();

        setUsers(data);
      } catch {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  // Roles
  const roles = useMemo(() => {
    return [
      'All',
      ...new Set(users.map(user => user.role)),
    ];
  }, [users]);

  // Filter
  const filteredUsers = useMemo(() => {
    if (filter === 'All') {
      return users;
    }

    return users.filter(
      user => user.role === filter
    );
  }, [users, filter]);

  // Sort
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const result = a[sortKey].localeCompare(
        b[sortKey]
      );

      return sortOrder === 'asc'
        ? result
        : -result;
    });
  }, [
    filteredUsers,
    sortKey,
    sortOrder,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    sortedUsers.length / PAGE_SIZE
  );

  const paginatedUsers = useMemo(() => {
    const startIndex =
      (currentPage - 1) * PAGE_SIZE;

    return sortedUsers.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );
  }, [sortedUsers, currentPage]);

  // Sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev =>
        prev === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }

    setCurrentPage(1);
  };

  // Filter
  const handleFilter = (role: string) => {
    setFilter(role);
    setCurrentPage(1);
  };

  // Previous page
  const handlePrevious = () => {
    setCurrentPage(prev =>
      Math.max(prev - 1, 1)
    );
  };

  // Next page
  const handleNext = () => {
    setCurrentPage(prev =>
      Math.min(prev + 1, totalPages)
    );
  };

  return {
    users: paginatedUsers,

    loading,
    error,

    roles,
    filter,

    sortKey,
    sortOrder,

    currentPage,
    totalPages,

    handleSort,
    handleFilter,

    handlePrevious,
    handleNext,
  };
}