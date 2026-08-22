export type User = {
  id: number;
  name: string;
  role: string;
};

export type SortKey = 'name' | 'role';

export type SortOrder = 'asc' | 'desc';