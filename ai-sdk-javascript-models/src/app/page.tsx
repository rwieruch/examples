"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { MODELS } from "@/app/model";

const Home = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [selectedModel, setSelectedModel] =
    useState<keyof typeof MODELS>("gpt-4-turbo");

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.content}
        </div>
      ))}

      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            body: { model: selectedModel },
          });
        }}
      >
        <select
          value={selectedModel}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedModel(event.target.value as keyof typeof MODELS);
          }}
        >
          {Object.keys(MODELS).map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Home;
