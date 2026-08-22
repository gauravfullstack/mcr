Smart move! Real API = real practice. 🎯

Here's the complete code written in the **exact sequence a developer thinks and writes** — top to bottom.

---

## Step 1: Types first — `src/types/index.ts`
```ts
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
```

---

## Step 2: API layer — `src/api/index.ts`
```ts
import { Post, ApiResponse } from '../types';

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
```

**Why this first?**
> API layer is the foundation — hook depends on it, so define it before the hook.

---

## Step 3: Custom Hook — `src/hooks/useInfiniteScroll.ts`
```ts
import { useState, useEffect, useCallback } from 'react';
import { Post } from '../types';
import { fetchPosts } from '../api';

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
```

**Why custom hook?**
> All logic lives here — App.tsx stays clean. This is Separation of Concerns.

---

## Step 4: Smallest components first — `src/components/PostCard.tsx`
```tsx
import { Post } from '../types';

type Props = {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div style={{
      padding: '16px',
      marginBottom: '12px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      background: '#fff',
    }}>
      <h3 style={{ margin: '0 0 8px', fontSize: '16px', textTransform: 'capitalize' }}>
        {post.title}
      </h3>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        {post.body}
      </p>
    </div>
  );
}
```

---

## Step 5: Skeleton — `src/components/Skeleton.tsx`
```tsx
const SkeletonItem = () => (
  <div style={{
    padding: '16px',
    marginBottom: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    background: '#fff',
  }}>
    <div style={{
      height: '16px',
      width: '40%',
      background: '#e0e0e0',
      borderRadius: '4px',
      marginBottom: '10px',
      animation: 'pulse 1.5s infinite',
    }} />
    <div style={{
      height: '14px',
      width: '80%',
      background: '#e0e0e0',
      borderRadius: '4px',
      animation: 'pulse 1.5s infinite',
    }} />
    <style>{`
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.4; }
        100% { opacity: 1; }
      }
    `}</style>
  </div>
);

export default function Skeleton() {
  return (
    <>
      {[1, 2, 3].map(i => <SkeletonItem key={i} />)}
    </>
  );
}
```

---

## Step 6: Error component — `src/components/ErrorMessage.tsx`
```tsx
type Props = {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div style={{ padding: '16px', textAlign: 'center', color: '#d32f2f' }}>
      <p style={{ marginBottom: '12px' }}>{message}</p>
      <button
        onClick={onRetry}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          border: '1px solid #d32f2f',
          color: '#d32f2f',
          background: 'transparent',
        }}
      >
        Retry
      </button>
    </div>
  );
}
```

---

## Step 7: App.tsx — wire everything together last
```tsx
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import PostCard from './components/PostCard';
import Skeleton from './components/Skeleton';
import ErrorMessage from './components/ErrorMessage';

export default function App() {
  const { posts, loading, error, hasMore, retry } = useInfiniteScroll();

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px 16px',
    }}>
      <h1 style={{ marginBottom: '24px' }}>Posts</h1>

      {/* render loaded posts */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* skeleton while loading */}
      {loading && <Skeleton />}

      {/* error with retry */}
      {error && <ErrorMessage message={error} onRetry={retry} />}

      {/* no more data */}
      {!hasMore && !loading && (
        <p style={{ textAlign: 'center', color: '#999', padding: '16px' }}>
          You have reached the end!
        </p>
      )}
    </div>
  );
}
```

---

## Final Folder Structure
```
src/
├── types/
│   └── index.ts        ← step 1
├── api/
│   └── index.ts        ← step 2
├── hooks/
│   └── useInfiniteScroll.ts  ← step 3
├── components/
│   ├── PostCard.tsx    ← step 4
│   ├── Skeleton.tsx    ← step 5
│   └── ErrorMessage.tsx ← step 6
└── App.tsx             ← step 7
```

---

## Developer Sequence — Why this order?

```
Types → API → Hook → Small Components → App
```

> Always define data shapes first → then data fetching → then logic → then UI pieces → then wire up.

This is exactly how a **senior developer thinks** — dependencies first, consumer last. 🎯

---

Copy paste karo VSCode mein — run karo — questions aaye toh puchho. 

Jab comfortable ho — **IntersectionObserver optimization** karenge. 💪