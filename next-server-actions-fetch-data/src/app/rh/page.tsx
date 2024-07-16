"use client";

import { Posts } from "@/posts";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("/api/posts");
  return await response.json();
};

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts-route-handler"],
    queryFn: fetchPosts,
  });

  return (
    <div>
      <h1>Route Handler</h1>

      {isLoading ? <div>Loading...</div> : <Posts posts={data ?? []} />}
    </div>
  );
};

export default Page;
