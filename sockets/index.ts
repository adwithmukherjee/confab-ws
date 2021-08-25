import { Server, Socket } from "socket.io";

module.exports = (io: Server) => (socket: Socket) => {
  console.log("client connected");

  socket.on("disconnect", () => console.log("Client disconnected"));
};
