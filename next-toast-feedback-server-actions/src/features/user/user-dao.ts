"use server";

import { revalidatePath } from "next/cache";
import { ActionState } from "@/type";

const toActionState = (
  message: string,
  status: "SUCCESS" | "ERROR"
): ActionState => {
  return { message, status, timestamp: Date.now() };
};

const users = [
  {
    id: "1",
    name: "Alice",
    upvotes: 0,
  },
  {
    id: "2",
    name: "Bob",
    upvotes: 0,
  },
];

export const getUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return users;
};

export const upvoteUser = async (
  actionState: ActionState,
  formData: FormData
) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const userId = formData.get("userId");

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return toActionState("User not found", "ERROR");
  }

  user.upvotes += 1;

  revalidatePath("/");

  return toActionState("User upvoted", "SUCCESS");
};

export const downvoteUser = async (): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  // force error for debugging purposes
  return toActionState("Something went wrong", "ERROR");
};

export const deleteUser = async (
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const userId = formData.get("userId");

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return toActionState("User not found", "ERROR");
  }

  users.splice(index, 1);

  // revalidatePath("/");
  // see refreshAllUnfortunatelyOnClient() as alternative/workaround
  // otherwise we do not see toast message for deleteUser
  // due to invalidate + unmount before toast is shown

  return toActionState("User deleted", "SUCCESS");
};
