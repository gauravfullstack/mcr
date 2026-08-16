import { useUsers } from '../hooks/useUsers';

import { UserFilter } from './UserFilter';
import { UserTable } from './UserTable';
import { Pagination } from './Pagination';

export default function DataTable() {
  const {
    users,
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}