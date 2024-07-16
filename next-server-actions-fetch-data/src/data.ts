"use server";

import { POSTS } from "./db";
import { Post } from "./types";

export const getPosts = async (): Promise<Post[]> => {
  // artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return POSTS;
};
