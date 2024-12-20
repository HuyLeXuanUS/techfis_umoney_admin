import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//router
import { BrowserRouter as Router } from "react-router-dom";
//Multi-Lang
import "./utils/locales/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
