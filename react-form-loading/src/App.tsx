import { useTransition } from "react";

const App = () => {
  const sendMessage = async (formData: FormData) => {
    const message = formData.get("message");

    console.log(message);

    // artificial delay to simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: do call (e.g. API call) to send the message
  };

  const [isPending, startTransition] = useTransition();

  const action = (formData: FormData) => {
    startTransition(async () => {
      await sendMessage(formData);
    });
  };

  return (
    <form action={action}>
      <label htmlFor="message">Message:</label>
      <input name="message" id="message" />

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending ..." : "Send"}
      </button>
    </form>
  );
};

export default App;
