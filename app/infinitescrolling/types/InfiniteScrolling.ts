// first define what your data looks like
export type Post = {
  id: number;
  title: string;
  body: string;
}

export type ApiResponse = {
  data: Post[];
  hasMore: boolean;
}