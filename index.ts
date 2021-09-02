const express = require("express");
import sslRedirect from "heroku-ssl-redirect";
const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require("./secret/huddle-7dff8-firebase-adminsdk-vnj3n-05c2a68ad5.json");
var cors = require("cors");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(sslRedirect());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://huddle-7dff8.firebaseio.com",
});

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const sockets = require("./sockets")(io);

io.on("connection", sockets);
// In dev mode just hide hide app.uss(... ) below

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
server.listen(PORT, () => console.log("App was started at port : " + PORT));
