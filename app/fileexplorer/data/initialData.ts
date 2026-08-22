import { TreeNode } from '../types';

export const initialData: TreeNode[] = [
  {
    id: '1', name: 'src', children: [
      {
        id: '2', name: 'components', children: [
          { id: '3', name: 'Button.tsx' },
          { id: '4', name: 'Input.tsx' },
        ]
      },
      {
        id: '5', name: 'hooks', children: [
          { id: '6', name: 'useAuth.ts' },
        ]
      },
      { id: '7', name: 'App.tsx' },
    ]
  },
  {
    id: '8', name: 'public', children: [
      { id: '9', name: 'index.html' },
    ]
  },
];