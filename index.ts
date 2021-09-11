import express from "express";
import sslRedirect from "heroku-ssl-redirect";
import admin from "firebase-admin";
import path from "path";
const serviceAccount = require("./secret/huddle-7dff8-firebase-adminsdk-vnj3n-05c2a68ad5.json");
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(sslRedirect());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://huddle-7dff8.firebaseio.com",
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const sockets = require("./sockets")(io);

io.on("connection", sockets);
// In dev mode just hide hide app.uss(... ) below

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/contact-us", (_req, res) => {
  res.redirect("https://bigmesslabs.notion.site/Contact-Us-fe070dbeb780434eb2039858480af6c7");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
server.listen(PORT, () => console.log("App was started at port : " + PORT));
