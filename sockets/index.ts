import { userInfo } from "os";
import { send } from "process";
import { Server, Socket } from "socket.io";
const events = require("../client/src/api/sockets/events.js");

const channels: {
  [key: string]: { users: { [key: string]: SocketUserObject } };
} = {}; //CHANNEL IDs => CHANNEL DATA

interface UserObject {
  isHost: boolean;
  muted: boolean;
  uid: string;
  user: {
    displayName: string;
    email: string;
    photoURL: string;
    profile: string;
  };
}

interface SocketUserObject {
  socketId: string;
  active: boolean;
  isHost: boolean;
  muted: boolean;
  uid: string;
  user: {
    displayName: string;
    email: string;
    photoURL: string;
    profile: string;
  };
}

function convertFromSocketUser(user: SocketUserObject): UserObject {
  const { socketId, active, ...rest } = user;
  return rest;
}

module.exports = (io: Server) => (socket: Socket) => {
  console.log("client connected");

  socket.on(
    events.JOIN_CHANNEL,
    ({ channel, user }: { channel: string; user: UserObject }) => {
      console.log("joining");
      console.log("" + user.user.email + " is joining channel " + channel);

      socket.join(channel);
      const email = user.user.email;

      //IF CHANNEL ALREADY EXISTS
      if (channel in channels) {
        //IF USER ALREADY IN CHANNEL
        if (email in channels[channel].users) {
          //TELL THIS EXISTING USER TO LEAVE, First, save their profile info
          const oldProfile = channels[channel].users[email].user.profile;

          if (channels[channel].users[email].active) {
            io.to(channels[channel].users[email].socketId).emit(
              events.LEAVE_CHANNEL
            );
          }

          const oldUserInfo = user.user;
          const newUserInfo = { ...oldUserInfo, profile: oldProfile };
          user = { ...user, user: newUserInfo };
          console.log(user);
          channels[channel].users[email] = {
            ...user,
            socketId: socket.id,
            active: true,
          };
        } else {
          //LOG THIS USERS SOCKET ID AND USER INFO
          channels[channel].users[email] = {
            ...user,
            active: true,
            socketId: socket.id,
          };
        } //IF CHANNEL DOES NOT EXIST
      } else {
        //CREATE CHANNEL RECORD AND ADD USER TO IT
        channels[channel] = { users: {} };
        channels[channel].users[email] = {
          ...user,
          active: true,
          socketId: socket.id,
        };
      }
      socket.data.channel = channel;
      socket.data.user = email;

      io.to(socket.id).emit(events.JOIN_CHANNEL, {
        user: convertFromSocketUser(channels[channel].users[email]),
      });

      sendUserData(channel);
    }
  );

  socket.on(
    events.UPDATE_USER,
    ({ channel, user }: { channel: string; user: UserObject }) => {
      console.log("UPDATE");
      const email = user.user.email;
      if (channels[channel]) {
        if (email in channels[channel].users) {
          channels[channel].users[email] = {
            ...user,
            active: true,
            socketId: socket.id,
          };

          console.log("sending updated channel " + channel + " users: ");

          sendUserData(channel);
        } else {
          console.log("something has gone wrong?");
        }
      }
    }
  );

  socket.on(
    events.LEAVE_CHANNEL,
    ({ channel, user }: { channel: string; user: UserObject }) => {
      console.log("LEAVING");
      if (user && user.user && user.user.email in channels[channel].users) {
        console.log("" + user.user.email + " leaving");
        channels[channel].users[user.user.email].active = false;
        // delete channels[channel].users[user.user.email];
        sendUserData(channel);
      }
    }
  );
  socket.on("disconnecting", () => {
    console.log("disconnecting");
    const { channel, user }: { channel: string; user: string } = socket.data;
    if (channel in channels && user in channels[channel].users) {
      channels[channel].users[user].active = false;
    }
    sendUserData(channel);

    // console.log(socket.data.channel);
    // console.log(socket.data.user);
    // //io.to(socket.id).emit(events.LEAVE_CHANNEL);
    // console.log(socket.id);
  });

  socket.on("disconnected", () => {
    console.log("disconnected");
  });

  socket.on("connect_error", (err) => console.log(err));
  socket.on("connect_failed", (err) => console.log(err));

  function sendUserData(channel: string) {
    if (channels[channel]) {
      const users = channels[channel].users;
      var values = Object.keys(users)
        .filter((val) => {
          return users[val].active;
        })
        .map(function (key) {
          return convertFromSocketUser(users[key]);
        });

      console.log(values);

      io.in(channel).emit(events.UPDATE_USER, {
        users: values,
      });
    }
  }
};
