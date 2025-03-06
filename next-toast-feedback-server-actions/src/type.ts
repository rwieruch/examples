export type ActionState =
  | {
      message: string;
      status: "SUCCESS" | "ERROR";
      timestamp: number;
    }
  | null
  | undefined;
