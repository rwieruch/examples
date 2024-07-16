type Post = {
  id: string;
  title: string;
};

type PostItemProps = {
  post: Post;
};

export const PostItem = ({ post }: PostItemProps) => {
  const deletePost = async () => {
    "use server";

    // logging in terminal
    console.log("TODO: delete post in DB");
  };

  return (
    <div>
      <span>{post.title}</span>

      <form action={deletePost}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};
