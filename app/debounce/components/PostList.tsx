import type { User } from "../api/fetchPosts";

type Props = {
  posts: User[];
  loading: boolean;
};

const PostList = ({ posts, loading }: Props) => {
  if (loading) return <p>Loading...</p>;

  return (
    <ul style={{ padding: 0 }}>
      {posts.map((post) => (
        <li
          key={post.id}
          style={{
            listStyle: "none",
            border: "1px solid #ccc",
            marginBottom: "8px",
            padding: "8px",
          }}
        >
          <strong>{post.name}</strong>
          <p style={{ margin: 0 }}>{post.email}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;