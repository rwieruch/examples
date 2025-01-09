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

  const result = await chain.invoke(input);

  return Response.json(result);
}
