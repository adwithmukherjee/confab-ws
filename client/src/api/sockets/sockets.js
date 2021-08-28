import io from "socket.io-client";
import events from "./events";

const socketURL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "/";
let socket = io(socketURL);
const initSocket = () => {
  socket.on("connect", () => console.log("Connected"));
};

export { socket, initSocket };
