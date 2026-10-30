import type {
  SortKey,
  SortOrder,
  User,
} from '../types/user';

type UserTableProps = {
  users: User[];
  sortKey: SortKey | null;
  sortOrder: SortOrder;
  onSort: (key: SortKey) => void;
};

export function UserTable({
  users,
  sortKey,
  sortOrder,
  onSort,
}: UserTableProps) {
  return (
    <table
      border={1}
      cellPadding={8}
      style={{ width: '100%' }}
    >
      <thead>
        <tr>
          {(['id', 'name', 'role'] as const).map((key) => (
            <th key={key} aria-sort={
              sortKey !== key || !sortOrder
                ? 'none'
                : sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
            }>
              <button type="button" onClick={() => onSort(key)}>
                {key === 'id' ? 'ID' : key === 'name' ? 'Name' : 'Role'}
                {sortKey === key && sortOrder
                  ? sortOrder === 'asc' ? ' ↑' : ' ↓'
                  : ''}
              </button>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {users.length === 0 ? (
          <tr>
            <td
              colSpan={3}
              style={{ textAlign: 'center' }}
            >
              No results
            </td>
          </tr>
        ) : (
          users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}