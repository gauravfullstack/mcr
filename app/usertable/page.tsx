'use client';
import { useUsers } from './hooks/useUsers';

import { UserFilter } from './components/UserFilter';
import { UserTable } from './components/UserTable';

export default function DataTable() {
  const {
    users,
    loading,
    error,

    roles,
    filter,

    sortKey,
    sortOrder,

    handleSort,
    handleFilter,

  } = useUsers();

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <UserFilter
        roles={roles}
        value={filter}
        onChange={handleFilter}
      />

      <UserTable
        users={users}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    </div>
  );
}