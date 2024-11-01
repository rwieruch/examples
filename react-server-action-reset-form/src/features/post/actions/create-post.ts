"use server";

type ActionState = {
  message: string;
  payload?: FormData;
};

export const createPost = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const data = {
    name: formData.get("name"),
    content: formData.get("content"),
  };

  console.log(data);

  if (!data.name || !data.content) {
    return {
      message: "Please fill in all fields",
      payload: formData,
    };
  }

  // TODO: create post in database

  return { message: "Post created" };
};
