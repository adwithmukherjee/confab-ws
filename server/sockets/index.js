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
var events = require("../../client/src/api/sockets/events.js");
var channels = {}; //CHANNEL IDs => CHANNEL DATA
function convertFromSocketUser(user) {
    var socketId = user.socketId, active = user.active, rest = __rest(user, ["socketId", "active"]);
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
                //TELL THIS EXISTING USER TO LEAVE, First, save their profile info
                var oldProfile = channels[channel].users[email].user.profile;
                io.to(channels[channel].users[email].socketId).emit(events.LEAVE_CHANNEL);
                var oldUserInfo = user.user;
                var newUserInfo = __assign(__assign({}, oldUserInfo), { profile: oldProfile });
                user = __assign(__assign({}, user), { user: newUserInfo });
                console.log(user);
                channels[channel].users[email] = __assign(__assign({}, user), { socketId: socket.id, active: true });
            }
            else {
                //LOG THIS USERS SOCKET ID AND USER INFO
                channels[channel].users[email] = __assign(__assign({}, user), { active: true, socketId: socket.id });
            } //IF CHANNEL DOES NOT EXIST
        }
        else {
            //CREATE CHANNEL RECORD AND ADD USER TO IT
            channels[channel] = { users: {} };
            channels[channel].users[email] = __assign(__assign({}, user), { active: true, socketId: socket.id });
        }
        socket.data.channel = channel;
        socket.data.user = email;
        io.to(socket.id).emit(events.JOIN_CHANNEL, {
            user: convertFromSocketUser(channels[channel].users[email]),
        });
        sendUserData(channel);
    });
    socket.on(events.GET_USERS, function (_a) {
        var uids = _a.uids;
        console.log("REMOTE UIDS");
        console.log(uids);
        if (channels[socket.data.channel]) {
            var users_1 = channels[socket.data.channel].users;
            console.log("poop");
            //console.log(users);
            var remoteUsers_1 = {};
            uids.forEach(function (uid) {
                var remoteUser = Object.values(users_1).find(function (user) {
                    return user.uid === uid;
                });
                if (remoteUser) {
                    remoteUsers_1[uid] = convertFromSocketUser(remoteUser);
                }
            });
            io.to(socket.id).emit(events.GET_USERS, { remoteUsers: remoteUsers_1 });
        }
    });
    socket.on(events.UPDATE_USER, function (_a) {
        var channel = _a.channel, user = _a.user;
        console.log("UPDATE");
        var email = user.user.email;
        if (channels[channel]) {
            if (email in channels[channel].users) {
                channels[channel].users[email] = __assign(__assign({}, user), { active: true, socketId: socket.id });
                console.log("sending updated channel " + channel + " users: ");
                sendUserData(channel);
            }
            else {
                console.log("something has gone wrong?");
            }
        }
    });
    socket.on(events.LEAVE_CHANNEL, function (_a) {
        var channel = _a.channel, user = _a.user;
        console.log("LEAVING");
        if (user && user.user && user.user.email in channels[channel].users) {
            console.log("" + user.user.email + " leaving");
            channels[channel].users[user.user.email].active = false;
            // delete channels[channel].users[user.user.email];
            sendUserData(channel);
        }
    });
    socket.on("disconnecting", function () {
        console.log("disconnecting");
        var _a = socket.data, channel = _a.channel, user = _a.user;
        if (channel in channels && user in channels[channel].users) {
            if (channels[channel].users[user].socketId == socket.id) {
                channels[channel].users[user].active = false;
            }
        }
        sendUserData(channel);
        // console.log(socket.data.channel);
        // console.log(socket.data.user);
        // //io.to(socket.id).emit(events.LEAVE_CHANNEL);
        // console.log(socket.id);
    });
    socket.on("disconnected", function () {
        console.log("disconnected");
    });
    socket.on("connect_error", function (err) { return console.log(err); });
    socket.on("connect_failed", function (err) { return console.log(err); });
    function sendUserData(channel) {
        if (channels[channel]) {
            var users_2 = channels[channel].users;
            var values = Object.keys(users_2)
                .filter(function (val) {
                return users_2[val].active;
            })
                .map(function (key) {
                return convertFromSocketUser(users_2[key]);
            });
            //console.log(values);
            io.in(channel).emit(events.UPDATE_USER, {
                users: values,
            });
        }
    }
}; };
