"use client";

import { getPosts } from "@/features/post/queries/get-posts";
import { useQuery } from "@tanstack/react-query";

const PostsPage = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div>
      <h1>React Query</h1>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
