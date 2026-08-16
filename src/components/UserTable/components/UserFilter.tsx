type UserFilterProps = {
  roles: string[];
  value: string;
  onChange: (value: string) => void;
};

export function UserFilter({
  roles,
  value,
  onChange,
}: UserFilterProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ marginBottom: '12px' }}
    >
      {roles.map(role => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}