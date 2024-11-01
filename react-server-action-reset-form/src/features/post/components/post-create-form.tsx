"use client";

import { useActionState } from "react";
import { createPost } from "../actions/create-post";

const PostCreateForm = () => {
  const [actionState, action] = useActionState(createPost, {
    message: "",
  });

  return (
    <form action={action}>
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        id="name"
        defaultValue={(actionState.payload?.get("name") || "") as string}
      />

      <label htmlFor="content">Content:</label>
      <textarea
        name="content"
        id="content"
        defaultValue={(actionState.payload?.get("content") || "") as string}
      />

      <button type="submit">Send</button>

      {actionState.message}
    </form>
  );
};

export default PostCreateForm;
