"use client";

import { useActionState } from "react";
import { deleteUser, downvoteUser, upvoteUser } from "@/daos/user-dao";
import { FormButton } from "./form-button";
import { useToast } from "@/hooks/use-toast";

type UserProps = {
  user: {
    id: number;
    name: string;
    upvotes: number;
  };
};

function withFeedback<Args extends unknown[], T>(
  fn: (...args: Args) => Promise<T>,
  callbacks: {
    onSuccess: (result: T) => void;
    onError: (error: unknown) => void;
  },
): (...args: Args) => Promise<T> {
  return (...args: Args) => {
    const result = fn(...args);
    result.then(callbacks.onSuccess, callbacks.onError);
    return result;
  };
}

function addToastFeedback<
  Args extends unknown[],
  T extends { message: string },
>(
  toast: ReturnType<typeof useToast>["toast"],
  fn: (...args: Args) => Promise<T>,
): (...args: Args) => Promise<T> {
  return withFeedback(fn, {
    onSuccess: (result) => {
      toast({ description: result.message });
    },
    onError: (error) => {
      toast({ description: (error as Error).message });
    },
  });
}

function useUpvote(userId: number) {
  const { toast } = useToast();
  return useActionState(
    addToastFeedback(toast, upvoteUser.bind(null, userId)),
    null,
  );
}

function useDownvote(userId: number) {
  const { toast } = useToast();
  return useActionState(
    addToastFeedback(toast, downvoteUser.bind(null, userId)),
    null,
  );
}

function useDelete(userId: number) {
  const { toast } = useToast();
  return useActionState(
    addToastFeedback(toast, deleteUser.bind(null, userId)),
    null,
  );
}

const User = ({ user }: UserProps) => {
  const [, upvoteAction, upvotePending] = useUpvote(user.id);
  const [, downvoteAction, downvotePending] = useDownvote(user.id);
  const [, deleteAction, deletePending] = useDelete(user.id);

  return (
    <div className="flex gap-x-2">
      {user.name} ({user.upvotes})
      <FormButton action={upvoteAction} pending={upvotePending}>
        Upvote
      </FormButton>
      <FormButton action={downvoteAction} pending={downvotePending}>
        Downvote
      </FormButton>
      <FormButton action={deleteAction} pending={deletePending}>
        Delete
      </FormButton>
    </div>
  );
};

export { User };
