import { MODELS } from "@/app/model";
import { Message, streamText } from "ai";

type RequestData = {
  messages: Message[];
  model: keyof typeof MODELS;
};

export async function POST(req: Request) {
  const { messages, model: selectedModel }: RequestData = await req.json();

  const model = MODELS[selectedModel];

  const result = await streamText({
    model,
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
