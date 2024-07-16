"use client";

import { getPosts } from "@/data";
import { Posts } from "@/posts";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  return await getPosts();
};

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts-server-action"],
    queryFn: fetchPosts,
  });

  return (
    <div>
      <h1>Server Action</h1>

      {isLoading ? <div>Loading...</div> : <Posts posts={data ?? []} />}
    </div>
  );
};

export default Page;
