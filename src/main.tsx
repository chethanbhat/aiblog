import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <GoogleOAuthProvider clientId="196826612163-tm4gmr4a5rbp501tpqe868otllb8fo07.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </UserProvider>
  </React.StrictMode>
);
