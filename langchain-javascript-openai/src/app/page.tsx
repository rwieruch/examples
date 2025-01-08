"use client";

import { useState } from "react";

type ChatMessage = {
  isUser: boolean;
  text: string;
};

const ChatMessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <p className="whitespace-pre-line border border-b-1 border-slate-400 p-2 m-2">
      {message.isUser ? "You" : "Bot"}: {message.text}
    </p>
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

    setMessages((prevState) => [...prevState, { isUser: true, text: prompt }]);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();

    setMessages((prevState) => [...prevState, { isUser: false, text: result }]);
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
