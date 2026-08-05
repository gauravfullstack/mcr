import PostCard from './components/PostCard';
import Skeleton from './components/Skeleton';
import ErrorMessage from './components/ErrorMessage';
import { useInfiniteScroll } from './hooks/useInfinite';

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