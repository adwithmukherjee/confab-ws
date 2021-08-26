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

  return <div className="App"></div>;
}

export default App;
