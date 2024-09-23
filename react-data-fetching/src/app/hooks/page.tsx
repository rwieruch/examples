"use client";

import { getPosts } from "@/features/post/queries/get-posts";
import { Post } from "@/features/post/types";
import { useEffect, useState } from "react";

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Hooks</h1>

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
