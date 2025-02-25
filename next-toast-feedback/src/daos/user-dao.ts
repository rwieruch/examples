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
    return { message: "User not found", timestamp: Date.now() };
  }

  user.upvotes += 1;

  revalidatePath("/");

  return { message: "Vote increased", timestamp: Date.now() };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const downvoteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  // force error for debugging purposes
  return { message: "Something went wrong", timestamp: Date.now() };
};

export const deleteUser = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return { message: "User not found", timestamp: Date.now() };
  }

  users.splice(index, 1);

  revalidatePath("/");
  // see refreshAllUnfortunatelyOnClient() as alternative/workaround
  // otherwise we do not see toast message for deleteUser
  // due to invalidate + unmount before toast is shown

  return { message: "User deleted", timestamp: Date.now() };
};
