"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ActionState } from "@/type";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  pending: boolean;
  onSuccess?: () => void;
  children: React.ReactNode;
};

const Form = ({
  action,
  actionState,
  pending,
  onSuccess,
  children,
}: FormProps) => {
  const prevTimestamp = useRef(actionState?.timestamp);
  const isUpdate = prevTimestamp.current !== actionState?.timestamp;

  useEffect(() => {
    if (actionState && actionState.message && isUpdate) {
      if (actionState.status === "SUCCESS") {
        toast.success(actionState.message);
      }

      if (actionState.status === "ERROR") {
        toast.error(actionState.message);
      }

      onSuccess?.();
    }

    prevTimestamp.current = actionState?.timestamp;
  }, [actionState, isUpdate, onSuccess]);

  const pendingToastId = useRef<null | string | number>(null);

  useEffect(() => {
    if (!pending && pendingToastId.current) {
      toast.dismiss(pendingToastId.current);
      pendingToastId.current = null;
    } else if (pending && !pendingToastId.current) {
      pendingToastId.current = toast.loading("Loading...");
    }

    return () => {
      if (pendingToastId.current) {
        toast.dismiss(pendingToastId.current);
      }
    };
  }, [pending]);

  return <form action={action}>{children}</form>;
};

export { Form };
