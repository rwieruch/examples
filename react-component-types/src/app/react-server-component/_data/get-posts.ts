const POSTS = [
  {
    id: 1,
    title: "Hello World",
    body: "Hello World from React Server Components!",
  },
  {
    id: 2,
    title: "Hello World 2",
    body: "Hello World 2 from React Server Components!",
  },
];

export const getPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return POSTS;
};
