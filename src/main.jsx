import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ComingSoon from "./ComingSoon.jsx";
import "./App.css";

const SHOW_COMING_SOON = true; // zet later op false om de echte app te tonen

function AppWrapper() {
  if (SHOW_COMING_SOON) {
    return <ComingSoon />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
