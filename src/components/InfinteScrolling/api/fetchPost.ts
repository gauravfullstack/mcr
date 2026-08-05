import type { ApiResponse, Post } from "../types/InfiniteScrolling";

const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 100; // jsonplaceholder has 100 posts

export const fetchPosts = async (page: number): Promise<ApiResponse> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${ITEMS_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts. Please try again.');
  }

  const data: Post[] = await response.json();

  return {
    data,
    hasMore: page * ITEMS_PER_PAGE < TOTAL_ITEMS,
  };
};