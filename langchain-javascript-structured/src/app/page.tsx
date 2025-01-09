"use client";

import { useState } from "react";
import { chatResponseFormatterSchema } from "@/chat-response-formatter";

type ChatMessage = {
  isUser: boolean;
  text: {
    answer: string;
    confidence?: number;
    source?: string;
  };
};

const ChatMessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <div className="whitespace-pre-line border border-b-1 border-slate-400 p-2 m-2">
      <p>
        {message.isUser ? "You" : "Bot"}: {message.text.answer}{" "}
        {message.text.source && <a href={message.text.source}>(Source)</a>}
      </p>
      {message.text.confidence && <p>Confidence: {message.text.confidence}</p>}
    </div>
  );
};

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setPrompt("");

    setMessages((prevState) => [
      ...prevState,
      {
        isUser: true,
        text: {
          answer: prompt,
        },
      },
    ]);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const result = chatResponseFormatterSchema.safeParse(await response.json());

    if (!result.success) return;

    setMessages((prevState) => [
      ...prevState,
      { isUser: false, text: result.data },
    ]);

    setIsLoading(false);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <ChatMessageItem key={index} message={message} />
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
