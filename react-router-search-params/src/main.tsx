import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <NuqsAdapter>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NuqsAdapter>
);
