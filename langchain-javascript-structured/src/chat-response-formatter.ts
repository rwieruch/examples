import { z } from "zod";

export const chatResponseFormatterSchema = z.object({
  answer: z.string().describe("The answer to the user's question"),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe("Confidence level of the answer, ranging from 0 to 1"),
  source: z
    .string()
    .url()
    .optional()
    .describe("A URL pointing to the source of the information, if available"),
});
