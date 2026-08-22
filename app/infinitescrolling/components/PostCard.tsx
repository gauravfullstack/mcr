import type { Post } from "../types/InfiniteScrolling";

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