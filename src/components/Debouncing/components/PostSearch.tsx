import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import PostList from "./PostList";

const PostSearch = () => {
  const [search, setSearch] = useState("");
  const { filtered, loading } = usePosts(search);

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
        }}
      />

      <PostList posts={filtered} loading={loading} />
    </div>
  );
};

export default PostSearch;