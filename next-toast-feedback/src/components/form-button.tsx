"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

type FormButtonProps = {
  action: () => void;
  actionState: { message: string; timestamp: number };
  pending: boolean;
  onSuccess?: () => void;
  children: React.ReactNode;
};

const FormButton = ({
  action,
  actionState,
  pending,
  onSuccess,
  children,
}: FormButtonProps) => {
  const { toast } = useToast();

  const prevTimestamp = useRef(actionState?.timestamp);
  const isUpdate = prevTimestamp.current !== actionState?.timestamp;

  useEffect(() => {
    if (actionState && actionState.message && isUpdate) {
      toast({ description: actionState.message });

      onSuccess?.();
    }

    prevTimestamp.current = actionState.timestamp;
  }, [actionState, isUpdate, onSuccess, toast]);

  return (
    <form action={action}>
      <button type="submit" disabled={pending}>
        {children}
      </button>
    </form>
  );
};

export { FormButton };
