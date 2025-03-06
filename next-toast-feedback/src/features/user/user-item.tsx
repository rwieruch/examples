"use client";

import { useActionState } from "react";
import { createToastCallbacks } from "@/utils/action-state-callback/toast-callbacks";
import { withCallbacks } from "@/utils/action-state-callback/with-callback";
import { deleteUser, downvoteUser, upvoteUser } from "./user-dao";

const useUpvoteUser = () => {
  return useActionState(
    withCallbacks(
      upvoteUser,
      createToastCallbacks({
        loadingMessage: "Upvoting ...",
      })
    ),
    null
  );
};

const useDownvoteUser = () => {
  return useActionState(
    withCallbacks(
      downvoteUser,
      createToastCallbacks({
        loadingMessage: "Downvoting ...",
      })
    ),
    null
  );
};

const useDeleteUser = () => {
  return useActionState(
    withCallbacks(
      deleteUser,
      createToastCallbacks({
        loadingMessage: "Deleting ...",
      })
    ),
    null
  );
};

type UserItemProps = {
  user: {
    id: string;
    name: string;
    upvotes: number;
  };
};

const UserItem = ({ user }: UserItemProps) => {
  const [, upvoteAction, upvotePending] = useUpvoteUser();
  const [, downvoteAction, downvotePending] = useDownvoteUser();
  const [, deleteAction, deletePending] = useDeleteUser();

  return (
    <div>
      {user.name} ({user.upvotes})
      <form action={upvoteAction}>
        <input type="hidden" name="userId" value={user.id} />
        <button type="submit" disabled={upvotePending}>
          {upvotePending ? "Upvoting" : "Upvote"}
        </button>
      </form>
      <form action={downvoteAction}>
        <button type="submit" disabled={downvotePending}>
          {downvotePending ? "Downvoting" : "Downvote"}
        </button>
      </form>
      <form action={deleteAction}>
        <input type="hidden" name="userId" value={user.id} />
        <button type="submit" disabled={deletePending}>
          {deletePending ? "Deleting" : "Delete"}
        </button>
      </form>
    </div>
  );
};

export { UserItem };
