import { Suspense } from "react";
import { getPosts } from "@/features/post/queries/get-posts";
import { PostList } from "./_components/post-list";

const PostsPage = () => {
  const postsPromise = getPosts();

  return (
    <div>
      <h1>use(Promise)</h1>

      <Suspense>
        <PostList promisedPosts={postsPromise} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
