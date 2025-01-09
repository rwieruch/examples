"use client";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useState } from "react";

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

    await fetchEventSource("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      onmessage: (message) => {
        if (message.event !== "data") return;

        const eventSourceMessage = JSON.parse(message.data);

        if (!eventSourceMessage.data.chunk) return;

        if (eventSourceMessage.event === "on_chain_stream") {
          setMessages((prevState) => [
            ...(prevState.at(-1)?.isUser ? prevState : prevState.slice(0, -1)),
            {
              isUser: false,
              text: eventSourceMessage.data.chunk,
            },
          ]);
        }
      },
    });

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
