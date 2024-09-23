"use client";

import { Post } from "@/features/post/types";
import { use } from "react";

type PostListProps = {
  promisedPosts: Promise<Post[]>;
};

const PostList = ({ promisedPosts }: PostListProps) => {
  const posts = use(promisedPosts);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export { PostList };
