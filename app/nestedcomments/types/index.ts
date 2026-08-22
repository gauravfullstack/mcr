export type Comment = {
  id: string;
  author: string;
  text: string;
  replies: Comment[];  // recursion lives here
}