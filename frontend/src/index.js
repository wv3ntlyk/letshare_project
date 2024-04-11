import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
      >
        <App />
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);
