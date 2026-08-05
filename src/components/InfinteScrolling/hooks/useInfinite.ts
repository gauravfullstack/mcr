import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types/InfiniteScrolling';
import { fetchPosts } from '../api/fetchPost';


export const useInfiniteScroll = () => {

  // 1. define all state first
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 2. core fetch function
  const loadPosts = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchPosts(pageNum);

      // append new posts to existing posts
      setPosts(prev => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setPage(pageNum + 1);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      // always runs — loading false whether success or fail
      setLoading(false);
    }
  }, []);

  // 3. fetch first page on mount
  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  // 4. scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // true when user is 10px near bottom
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

      // only fetch if: near bottom + not already loading + more data exists
      if (isNearBottom && !loading && hasMore) {
        loadPosts(page);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // cleanup — remove listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);

  }, [loading, hasMore, page, loadPosts]);

  // 5. retry function for error state
  const retry = () => {
    setError(null);
    loadPosts(page);
  };

  return { posts, loading, error, hasMore, retry };
};