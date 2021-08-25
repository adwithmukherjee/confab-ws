"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (io) { return function (socket) {
    console.log("client connected");
    socket.on("disconnect", function () { return console.log("Client disconnected"); });
}; };
