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
  const [incomingMessage, setIncomingMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setPrompt("");

    setMessages((prevState) => [...prevState, { isUser: true, text: prompt }]);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    if (!response.body) return;

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    if (reader) setIsLoading(false);

    let incomingMessage = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        setMessages((prevState) => [
          ...prevState,
          { isUser: false, text: incomingMessage },
        ]);

        setIncomingMessage("");

        break;
      }

      if (value) {
        incomingMessage += value;

        setIncomingMessage(incomingMessage);
      }
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <ChatMessageItem key={index} message={message} />
        ))}

        {incomingMessage && (
          <ChatMessageItem message={{ isUser: false, text: incomingMessage }} />
        )}
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
