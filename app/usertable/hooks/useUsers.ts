'use client';
import { useEffect, useMemo, useState } from 'react';

import { fetchUsers } from '../api/userApi';

import type {
  SortKey,
  SortOrder,
  User,
} from '../types/user';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const [filter, setFilter] = useState('All');

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
    if (!sortKey || !sortOrder) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const result =
        typeof a[sortKey] === 'number' && typeof b[sortKey] === 'number'
          ? a[sortKey] - b[sortKey]
          : String(a[sortKey]).localeCompare(String(b[sortKey]));

      return sortOrder === 'asc'
        ? result
        : -result;
    });
  }, [
    filteredUsers,
    sortKey,
    sortOrder,
  ]);

  // Sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else {
        setSortKey(null);
        setSortOrder(null);
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }

  };

  // Filter
  const handleFilter = (role: string) => {
    setFilter(role);
  };


  return {
    users: sortedUsers,

    loading,
    error,

    roles,
    filter,

    sortKey,
    sortOrder,

    handleSort,
    handleFilter,

  };
}