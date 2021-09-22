import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.tsx";
console.log("testing");
console.log(process.env.FIREBASE_API_KEY);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
