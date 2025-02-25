import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

const openaiModel = openai("gpt-4-turbo");
const anthropic35Model = anthropic("claude-3-5-sonnet-latest");
const anthropic37Model = anthropic("claude-3-7-sonnet-20250219");

export const MODELS = {
  "gpt-4-turbo": openaiModel,
  "claude-3-5-sonnet-latest": anthropic35Model,
  "claude-3-7-sonnet-20250219": anthropic37Model,
  // add more models as they become available
} as const;
