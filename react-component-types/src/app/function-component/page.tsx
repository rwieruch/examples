"use client";

import { useEffect, useState } from "react";

const useLocalStorage = (storageKey) => {
  const [value, setValue] = useState(localStorage.getItem(storageKey) || "");

  useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [storageKey, value]);

  return [value, setValue];
};

const FunctionComponent = () => {
  const [text, setText] = useLocalStorage("text");

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <p>Text: {text}</p>

      <input type="text" value={text} onChange={handleChangeText} />
    </div>
  );
};

export default FunctionComponent;
