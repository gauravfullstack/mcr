export type User = {
  id: number;
  name: string;
  role: string;
};

export type SortKey = 'id' | 'name' | 'role';

export type SortOrder = 'asc' | 'desc' | null;