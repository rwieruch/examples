import { getPosts } from "@/data";
import { Posts } from "@/posts";
import { Suspense } from "react";

const MyPosts = async () => {
  const posts = await getPosts();

  return <Posts posts={posts} />;
};

const Page = () => {
  return (
    <div>
      <h1>React Server Component</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <MyPosts />
      </Suspense>
    </div>
  );
};

export default Page;
