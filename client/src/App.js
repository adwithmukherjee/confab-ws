import logo from "./logo.svg";
import io from "socket.io-client";
import { useEffect } from "react";
import "./App.css";

function App() {
  const socketURL =
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "/";

  const initSocket = () => {
    let socket = io(socketURL);

    socket.on("connect", () => console.log("Connected"));
  };

  useEffect(() => {
    initSocket();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
