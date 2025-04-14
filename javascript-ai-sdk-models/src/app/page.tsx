"use client";

import { useState } from "react";
import { MODELS } from "@/app/model";
import { ChatPerModel } from "@/components/chat-per-model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [input, setInput] =
    useState<React.ChangeEvent<HTMLInputElement> | null>(null);

  const [prompt, setPrompt] = useState<React.FormEvent<HTMLFormElement> | null>(
    null
  );

  return (
    <div className="flex-1 flex flex-col gap-y-4 p-4">
      <div className="flex-1 flex gap-4">
        {Object.keys(MODELS).map((key) => (
          <ChatPerModel key={key} model={key} input={input} prompt={prompt} />
        ))}
      </div>

      <form
        className="flex gap-4"
        onSubmit={(event) => {
          event.preventDefault();

          setPrompt(event);
          setInput(null);
        }}
      >
        <Input
          name="prompt"
          value={input?.target.value ?? ""}
          onChange={setInput}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Home;
