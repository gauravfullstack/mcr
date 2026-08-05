import { useEffect, useState } from "react";
import { fetchPosts } from "../api/fetchPosts";
import type { User } from "../api/fetchPosts";

export const usePosts = (search: string) => {
  const [posts, setPosts] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch once
  useEffect(() => {
    setLoading(true);
    fetchPosts()
      .then((data) => {
        setPosts(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = posts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(result);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, posts]);

  return { filtered, loading };
};