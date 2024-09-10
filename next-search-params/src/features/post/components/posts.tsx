import { getPosts } from "../queries/get-posts";
import { ParsedSearchParams } from "../search-params";
import { PostsSearch } from "./posts-search";
import { PostsSort } from "./posts-sort";

type PostsProps = {
  searchParams: ParsedSearchParams;
};

const Posts = async ({ searchParams }: PostsProps) => {
  const posts = await getPosts(searchParams);

  return (
    <div>
      <PostsSearch placeholder="Search posts" />
      <PostsSort />

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              {post.title} ({post.createdAt.toLocaleDateString()})
            </span>
            {" - "}
            <span>{post.upvotes} upvotes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Posts };
