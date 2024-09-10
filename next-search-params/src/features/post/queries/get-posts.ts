import { POSTS } from "../db";
import { ParsedSearchParams } from "../search-params";

export const getPosts = async (searchParams: ParsedSearchParams) => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const filteredPosts = POSTS.filter((post) =>
    post.title.toLowerCase().includes(searchParams.search.toLowerCase())
  );

  const sortedPosts = filteredPosts; // EXERCISE: sort logic here

  return sortedPosts;
};
