"use strict";
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var sockets = require("./sockets")(io);
var PORT = process.env.PORT || 8000;
var path = require("path");
io.on("connection", sockets);
// In dev mode just hide hide app.uss(... ) below
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "./client/build/index.html"));
});
server.listen(PORT, function () { return console.log("App was started at port : " + PORT); });
