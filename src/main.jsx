import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </QueryClientProvider>
);
