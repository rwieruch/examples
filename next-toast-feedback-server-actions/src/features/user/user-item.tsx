"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/form";
import { deleteUser, downvoteUser, upvoteUser } from "./user-dao";

type UserItemProps = {
  user: {
    id: string;
    name: string;
    upvotes: number;
  };
};

const UserItem = ({ user }: UserItemProps) => {
  const router = useRouter();

  const [upvoteState, upvoteAction, upvotePending] = useActionState(
    upvoteUser,
    null
  );

  const [downvoteState, downvoteAction, downvotePending] = useActionState(
    downvoteUser,
    null
  );

  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteUser,
    null
  );

  return (
    <div>
      {user.name} ({user.upvotes})
      <Form
        action={upvoteAction}
        actionState={upvoteState}
        pending={upvotePending}
      >
        <input type="hidden" name="userId" value={user.id} />

        <button type="submit" disabled={upvotePending}>
          {upvotePending ? "Upvoting..." : "Upvote"}
        </button>
      </Form>
      <Form
        action={downvoteAction}
        actionState={downvoteState}
        pending={downvotePending}
      >
        <button type="submit" disabled={downvotePending}>
          {downvotePending ? "Downvoting..." : "Downvote"}
        </button>
      </Form>
      <Form
        action={deleteAction}
        actionState={deleteState}
        pending={deletePending}
        onSuccess={() => router.refresh()}
      >
        <input type="hidden" name="userId" value={user.id} />

        <button type="submit" disabled={deletePending}>
          {deletePending ? "Deleting..." : "Delete"}
        </button>
      </Form>
    </div>
  );
};

export { UserItem };
