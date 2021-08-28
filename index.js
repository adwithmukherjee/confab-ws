"use strict";
var express = require("express");
var admin = require("firebase-admin");
var path = require("path");
var serviceAccount = require("./secret/huddle-7dff8-firebase-adminsdk-vnj3n-05c2a68ad5.json");
var cors = require("cors");
var PORT = process.env.PORT || 8000;
var app = express();
app.use(cors());
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://huddle-7dff8.firebaseio.com",
});
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var sockets = require("./sockets")(io);
io.on("connection", sockets);
// In dev mode just hide hide app.uss(... ) below
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
server.listen(PORT, function () { return console.log("App was started at port : " + PORT); });
