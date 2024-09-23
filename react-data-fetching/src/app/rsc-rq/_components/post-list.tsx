"use client";

import { getPosts } from "@/features/post/queries/get-posts";
import { Post } from "@/features/post/types";
import { useQuery } from "@tanstack/react-query";

type PostListProps = {
  initialPosts: Post[];
};

const PostList = ({ initialPosts }: PostListProps) => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialData: initialPosts,
  });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export { PostList };
