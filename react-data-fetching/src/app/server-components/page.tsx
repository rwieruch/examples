import { getPosts } from "@/features/post/queries/get-posts";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <h1>React Server Component</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
