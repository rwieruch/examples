"use client";

type FormButtonProps = {
  action: () => void;
  pending: boolean;
  children: React.ReactNode;
};

const FormButton = ({
  action,
  pending,
  children,
}: FormButtonProps) => {
  return (
    <form action={action}>
      <button type="submit" disabled={pending}>
        {pending ? "..." : children}
      </button>
    </form>
  );
};

export { FormButton };
