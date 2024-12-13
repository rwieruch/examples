import { ZodError } from "zod";

export type ActionState = {
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
};

export const fromErrorToActionState = (error: unknown): ActionState => {
  if (error instanceof ZodError) {
    return {
      message: "",
      fieldErrors: error.flatten().fieldErrors,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
    };
  } else {
    return {
      message: "An unknown error occurred",
      fieldErrors: {},
    };
  }
};

export const toActionState = (message: string): ActionState => ({
  message,
  fieldErrors: {},
});
