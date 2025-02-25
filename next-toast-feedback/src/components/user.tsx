"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { deleteUser, downvoteUser, upvoteUser } from "@/daos/user-dao";
import { FormButton } from "./form-button";

type UserProps = {
  user: {
    id: number;
    name: string;
    upvotes: number;
  };
};

const User = ({ user }: UserProps) => {
  const router = useRouter();

  const [upvoteState, upvoteAction, upvotePending] = useActionState(
    upvoteUser.bind(null, user.id),
    { message: "", timestamp: Date.now() }
  );

  const [downvoteState, downvoteAction, downvotePending] = useActionState(
    downvoteUser.bind(null, user.id),
    { message: "", timestamp: Date.now() }
  );

  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteUser.bind(null, user.id),
    { message: "", timestamp: Date.now() }
  );

  const refreshAllUnfortunatelyOnClient = () => router.refresh();

  return (
    <div className="flex gap-x-2">
      {user.name} ({user.upvotes})
      <FormButton
        action={upvoteAction}
        actionState={upvoteState}
        pending={upvotePending}
      >
        Upvote
      </FormButton>
      <FormButton
        action={downvoteAction}
        actionState={downvoteState}
        pending={downvotePending}
      >
        Downvote
      </FormButton>
      <FormButton
        action={deleteAction}
        actionState={deleteState}
        pending={deletePending}
        onSuccess={refreshAllUnfortunatelyOnClient}
      >
        Delete
      </FormButton>
    </div>
  );
};

export { User };
