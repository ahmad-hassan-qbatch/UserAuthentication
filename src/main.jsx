/* eslint-disable no-undef */
import "./index.css";

import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
