import type { Column } from '../types';

export const initialColumns: Column[] = [
  {
    id: 'todo',
    title: '📋 To Do',
    cards: [
      { id: '1', title: 'Setup project', status: 'todo' },
      { id: '2', title: 'Design database', status: 'todo' },
    ],
  },
  {
    id: 'inprogress',
    title: '🔄 In Progress',
    cards: [
      { id: '3', title: 'Build auth flow', status: 'inprogress' },
    ],
  },
  {
    id: 'done',
    title: '✅ Done',
    cards: [
      { id: '4', title: 'Project kickoff', status: 'done' },
    ],
  },
];