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
  const { socketId, ...rest } = user;
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
          //TELL THIS EXISTING USER TO LEAVE
        } else {
          //LOG THIS USERS SOCKET ID AND USER INFO
          channels[channel].users[email] = {
            ...user,
            socketId: socket.id,
          };
        } //IF CHANNEL DOES NOT EXIST
      } else {
        //CREATE CHANNEL RECORD AND ADD USER TO IT
        channels[channel] = { users: {} };
        channels[channel].users[email] = {
          ...user,
          socketId: socket.id,
        };
      }

      sendUserData(channel);
    }
  );

  socket.on(
    events.UPDATE_USER,
    ({ channel, user }: { channel: string; user: UserObject }) => {
      const email = user.user.email;
      if (channels[channel]) {
        if (email in channels[channel].users) {
          channels[channel].users[email] = { ...user, socketId: socket.id };

          console.log("sending updated channel " + channel + " users: ");

          sendUserData(channel);
        } else {
          console.log("something has gone wrong?");
        }
      }
    }
  );
  socket.on("disconnect", () => {});

  function sendUserData(channel: string) {
    if (channels[channel]) {
      const users = channels[channel].users;
      var values = Object.keys(users).map(function (key) {
        return convertFromSocketUser(users[key]);
      });

      console.log(values);

      io.in(channel).emit(events.UPDATE_USER, {
        users: values,
      });
    }
  }
};
