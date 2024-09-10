import { Post } from "./types";

export const POSTS: Post[] = [
  {
    id: "1",
    title: "Post 1",
    createdAt: new Date("2021-02-01"),
    upvotes: 3,
  },
  {
    id: "2",
    title: "Post 2",
    createdAt: new Date("2021-01-01"),
    upvotes: 1,
  },
  {
    id: "3",
    title: "Post 3",
    createdAt: new Date("2021-03-01"),
    upvotes: 2,
  },
];
