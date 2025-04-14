import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChatPerModelProps = {
  model: string;
  input: React.ChangeEvent<HTMLInputElement> | null;
  prompt: React.FormEvent<HTMLFormElement> | null;
};

const ChatPerModel = ({ model, input, prompt }: ChatPerModelProps) => {
  const { messages, handleSubmit, handleInputChange } = useChat();

  //* Sync change handler with useChat
  useEffect(() => {
    if (!input) return;

    handleInputChange(input);
  }, [handleInputChange, input]);

  //* Sync submit handler with useChat
  const previousPrompt = useRef(prompt);

  useEffect(() => {
    if (!prompt) return;

    if (previousPrompt.current === prompt) return;
    previousPrompt.current = prompt;

    handleSubmit(prompt, {
      body: { model },
    });
  }, [handleSubmit, model, prompt]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chat with {model}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <strong>{message.role === "user" ? "User" : "AI"}:</strong>{" "}
              {message.content}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { ChatPerModel };
