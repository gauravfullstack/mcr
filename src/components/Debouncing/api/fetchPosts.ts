export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const fetchPosts = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
};