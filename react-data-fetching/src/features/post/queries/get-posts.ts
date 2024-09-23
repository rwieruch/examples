import { POSTS } from "../db";

export const getPosts = async () => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return POSTS;
};
