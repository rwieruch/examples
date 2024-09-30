import { getPosts } from "./_data/get-posts";

const ReactServerComponent = async () => {
  const posts = await getPosts();

  return (
    <div>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReactServerComponent;
