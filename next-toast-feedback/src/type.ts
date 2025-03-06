export type ActionState =
  | {
      message: string;
      status: "SUCCESS" | "ERROR";
    }
  | null
  | undefined;
