import type {
  SortKey,
  SortOrder,
  User,
} from '../types/user';

type UserTableProps = {
  users: User[];
  sortKey: SortKey;
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
          <th>ID</th>

          <th
            onClick={() => onSort('name')}
            style={{ cursor: 'pointer' }}
          >
            Name

            {sortKey === 'name' && (
              <span>
                {' '}
                {sortOrder === 'asc'
                  ? '↑'
                  : '↓'}
              </span>
            )}
          </th>

          <th
            onClick={() => onSort('role')}
            style={{ cursor: 'pointer' }}
          >
            Role

            {sortKey === 'role' && (
              <span>
                {' '}
                {sortOrder === 'asc'
                  ? '↑'
                  : '↓'}
              </span>
            )}
          </th>
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