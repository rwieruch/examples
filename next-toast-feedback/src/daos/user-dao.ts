"use server";

import { revalidatePath } from "next/cache";

const users = [
  {
    id: 1,
    name: "Alice",
    upvotes: 0,
  },
  {
    id: 2,
    name: "Bob",
    upvotes: 0,
  },
];

export const getUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return users;
};

export const upvoteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return { message: "User not found" };
  }

  user.upvotes += 1;

  revalidatePath("/");

  return { message: "Vote increased" };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const downvoteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  // force error for debugging purposes
  return { message: "Something went wrong" };
};

export const deleteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return { message: "User not found" };
  }

  users.splice(index, 1);

  revalidatePath("/");

  return { message: "User deleted" };
};
