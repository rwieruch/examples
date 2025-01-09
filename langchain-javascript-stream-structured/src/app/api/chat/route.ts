import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { chatResponseFormatterSchema } from "@/chat-response-formatter";

export async function POST(req: Request) {
  const { prompt: input } = await req.json();

  const model = new ChatOpenAI();

  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage("You're a helpful assistant"),
    new HumanMessage(input),
  ]);

  const parser = StructuredOutputParser.fromZodSchema(
    chatResponseFormatterSchema
  );

  const chain = prompt.pipe(model.withStructuredOutput(parser));

  const stream = await chain.streamEvents(input, {
    version: "v2",
    encoding: "text/event-stream",
  });

  // stream() does not work with structured output
  // let me know if you find a way to make it work
  // const stream = await chain.stream(input);

  return new Response(stream, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
