const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const sockets = require("./sockets")(io);
const PORT = process.env.PORT || 8000;
const path = require("path");

io.on("connection", sockets);
// In dev mode just hide hide app.uss(... ) below

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname + "./client/build/index.html"));
});
server.listen(PORT, () => console.log("App was started at port : " + PORT));
