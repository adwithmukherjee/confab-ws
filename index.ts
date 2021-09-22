import express from "express";
import mongoose from "mongoose"; // user: amukhe12 , password: MkJue2UCi38zPOen
import cookieSession from "cookie-session";
import passport from "passport";
import sslRedirect from "heroku-ssl-redirect";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const keys = require("./server/config/keys.js");
const bodyParser = require("body-parser");
require("./server/models/User"); //User.js executes, i.e. User Model Class created. This must go beforethe passport require
require("./server/models/Meeting");
require("./server/services/passport.js");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    //argument is an object that specifies configuration of cookies
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in millisec
    keys: [keys.cookieKey], //a list of keys used to encrypt cookies
    //secure: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(sslRedirect());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // dont forget this
});

require("./server/routes/authRoutes")(app);
require("./server/routes/meetingRoutes")(app);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const sockets = require("./server/sockets")(io);

io.on("connection", sockets);
// In dev mode just hide hide app.uss(... ) below

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/contact-us", (_req, res) => {
  res.redirect(
    "https://bigmesslabs.notion.site/Contact-Us-fe070dbeb780434eb2039858480af6c7"
  );
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log("App was started at port : " + PORT));
