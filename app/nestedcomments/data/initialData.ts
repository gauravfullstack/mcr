import { Comment } from '../types';

export const initialComments: Comment[] = [
  {
    id: '1',
    author: 'Gaurav',
    text: 'This is the first comment.',
    replies: [
      {
        id: '2',
        author: 'Amit',
        text: 'This is a reply.',
        replies: [
          {
            id: '3',
            author: 'Priya',
            text: 'This is a nested reply.',
            replies: [],
          }
        ],
      }
    ],
  },
  {
    id: '4',
    author: 'Rohan',
    text: 'Another top level comment.',
    replies: [],
  },
];