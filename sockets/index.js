"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("../client/src/api/sockets/events.js");
var channels = {}; //CHANNEL IDs => CHANNEL DATA
function convertFromSocketUser(user) {
    var socketId = user.socketId, rest = __rest(user, ["socketId"]);
    return rest;
}
module.exports = function (io) { return function (socket) {
    console.log("client connected");
    socket.on(events.JOIN_CHANNEL, function (_a) {
        var channel = _a.channel, user = _a.user;
        console.log("joining");
        console.log("" + user.user.email + " is joining channel " + channel);
        socket.join(channel);
        var email = user.user.email;
        //IF CHANNEL ALREADY EXISTS
        if (channel in channels) {
            //IF USER ALREADY IN CHANNEL
            if (email in channels[channel].users) {
                //TELL THIS EXISTING USER TO LEAVE
            }
            else {
                //LOG THIS USERS SOCKET ID AND USER INFO
                channels[channel].users[email] = __assign(__assign({}, user), { socketId: socket.id });
            } //IF CHANNEL DOES NOT EXIST
        }
        else {
            //CREATE CHANNEL RECORD AND ADD USER TO IT
            channels[channel] = { users: {} };
            channels[channel].users[email] = __assign(__assign({}, user), { socketId: socket.id });
        }
        sendUserData(channel);
    });
    socket.on(events.UPDATE_USER, function (_a) {
        var channel = _a.channel, user = _a.user;
        var email = user.user.email;
        if (channels[channel]) {
            if (email in channels[channel].users) {
                channels[channel].users[email] = __assign(__assign({}, user), { socketId: socket.id });
                console.log("sending updated channel " + channel + " users: ");
                sendUserData(channel);
            }
            else {
                console.log("something has gone wrong?");
            }
        }
    });
    socket.on("disconnect", function () { });
    function sendUserData(channel) {
        if (channels[channel]) {
            var users_1 = channels[channel].users;
            var values = Object.keys(users_1).map(function (key) {
                return convertFromSocketUser(users_1[key]);
            });
            console.log(values);
            io.in(channel).emit(events.UPDATE_USER, {
                users: values,
            });
        }
    }
}; };
