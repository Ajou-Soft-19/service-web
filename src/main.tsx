import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import { worker } from "./mocks/worker";

const enableMocking = async () => {
  if (import.meta.env.VITE_NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("./mocks/worker");

  return worker.start();
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
