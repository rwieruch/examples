import { getPosts } from "@/features/post/queries/get-posts";
import { PostList } from "./_components/post-list";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <h1>React Server Component + React Query</h1>

      <PostList initialPosts={posts} />
    </div>
  );
};

export default PostsPage;
