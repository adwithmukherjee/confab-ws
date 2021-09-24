import { useContext, useEffect, useRef, useState } from "react";
import useAgora from "../hooks/useAgora";
import AgoraRTC from "agora-rtc-sdk-ng";
import { RtmTokenBuilder, RtcRole, RtcTokenBuilder } from "agora-access-token";
import { useParams, useHistory, Prompt } from "react-router-dom";
import UserContext from "../context/UserContext";
import Call, { AgoraUserObject, UserObject } from "../components/Call";
import { socket } from "../api/sockets/sockets";
import events from "../api/sockets/events";
import Loading from "../components/Loading";
const keys: any = require("../keys");

function convertFromAgoraUser(user: AgoraUserObject): UserObject | undefined {
  const { audioTrack, ...rest } = user;
  if (rest.user) {
    const { isHost, uid, muted } = rest;
    return { isHost, uid, muted, user: rest.user };
  } else {
    return undefined;
  }
}

const CallPage = () => {
  const [client] = useState(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  const user = useContext(UserContext)?.user;
  const playSound = () => {
    const audioElement = document.getElementsByClassName(
      "audio"
    )[0] as HTMLAudioElement;
    if (audioElement) {
      audioElement.play();
    }
  };

  const [joinedOnce, setJoinedOnce] = useState(false);

  const [localUser, setLocalUser] = useState<UserObject | undefined>(undefined);
  const [remoteUserData, setRemoteUserData] = useState<{
    [uid: string]: UserObject;
  }>({});

  const [remoteUsers, setRemoteUsers] = useState<AgoraUserObject[]>([]);

  const {
    localAudioTrack,
    leave,
    join,
    joinState,
    remoteUsers: remoteAgoraUsers,
  } = useAgora(client, playSound);

  const localAudioTrackRef = useRef(localAudioTrack);
  const localUserRef = useRef(localUser);
  const remoteAgoraUsersRef = useRef(remoteAgoraUsers);

  useEffect(() => {
    localAudioTrackRef.current = localAudioTrack;
    localUserRef.current = localUser;
    remoteAgoraUsersRef.current = remoteAgoraUsers;
  });

  const { channelId } = useParams<{ channelId: string }>();
  const history = useHistory();

  const [channel] = useState(channelId);
  const [appid] = useState("37819f409bdf4c9f9405b89172a0155e");
  const [token] = useState(
    RtcTokenBuilder.buildTokenWithUid(
      "37819f409bdf4c9f9405b89172a0155e",
      "e04c71eba3134c46b40389d3f7ea06a9",
      channelId,
      0,
      RtcRole.PUBLISHER,
      Math.floor(Date.now() / 1000) + 3600
    )
  );

  useEffect(() => {
    if (localUser) {
      console.log("emitting");
      socket.emit(events.UPDATE_USER, {
        channel,
        user: localUser,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteAgoraUsers]);

  const setRemoteUserState = ({ users }: { users: UserObject[] }) => {
    const tmp: {
      [uid: string]: UserObject;
    } = remoteUserData;
    users.forEach((user) => {
      if (user.uid) {
        tmp[user.uid] = user;
      }
    });
    setRemoteUserData(tmp);
    // console.log("receiving");
    // const localUser = localUserRef.current;
    // const remoteAgoraUsers = remoteAgoraUsersRef.current;
    // console.log(users);
    // // console.log(localUser);
    // //console.log(remoteAgoraUsers);
    // // console.log(localAudioTrack);
    // // console.log(localAudioTrackRef.current);
    // if (localUser && remoteAgoraUsers) {
    //   const remoteUserList = users.map((remoteUser) => {
    //     const audioTrack = remoteAgoraUsers.find((val) => {
    //       return val.uid.toString() === remoteUser.uid;
    //     })?.audioTrack;
    //     return { ...remoteUser, audioTrack };
    //   });
    //   setRemoteUsers(
    //     remoteUserList.filter((remoteUser) => {
    //       return remoteUser.user.email !== localUser.user.email;
    //     })
    //   );
    // } else {
    //   //console.log("no remote users");
    // }
  };

  useEffect(() => {
    console.log(remoteAgoraUsers);
    socket.emit(events.GET_USERS, { uids: Object.keys(remoteAgoraUsers) });
  }, [remoteAgoraUsers]);

  useEffect(() => {
    console.log(remoteUserData);
  }, [remoteUserData]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket " + socket.id);
    });

    socket.on(events.UPDATE_USER, setRemoteUserState);
    socket.on(
      events.GET_USERS,
      ({ remoteUsers }: { remoteUsers: { [uid: string]: UserObject } }) => {
        console.log("GETTING REMOTE USER DATA");
        setRemoteUserData(remoteUsers);
      }
    );
    socket.on(events.LEAVE_CHANNEL, getReplaced);
    socket.on(events.JOIN_CHANNEL, ({ user }: { user: UserObject }) => {
      console.log("IN JOIN RECEIVER");
      setLocalUser({
        ...user,
      });
      setJoinedOnce(true);
    });

    return () => {
      socket.emit(events.LEAVE_CHANNEL, {
        channel,
        user: localUser,
      });
      leave();
      socket.off(events.UPDATE_USER, setRemoteUserState);
      console.log("LEAVING USE EFFECT");

      //socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    join(appid, channel, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (joinState && user) {
      console.log("joined");
      const tmpUser: UserObject = {
        user,
        isHost: false,
        muted: false,
        uid: client.uid?.toString(),
      };
      socket.emit(events.JOIN_CHANNEL, { channel, user: tmpUser });
      // setJoinedOnce(true);
      console.log();
      // setLocalUser({
      //   user,
      //   isHost: false,
      //   muted: false,
      //   audioTrack: localAudioTrack,
      //   uid: client.uid?.toString(),
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinState, user]);

  //   useEffect(() => {
  //     console.log(localUser);
  //   }, [localUser]);

  /*EVERY TIME LOCAL USER STATE CHANGES, EMIT TO WS CONNECTION*/
  useEffect(() => {
    if (localUser && joinedOnce) {
      console.log(localUser);
      console.log("emitting!");
      socket.emit(events.UPDATE_USER, {
        channel,
        user: localUser,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser]);

  // useEffect(() => {
  //   const refresh = () => {
  //     console.log("ass");
  //     if (localUser?.audioTrack === undefined && joinedOnce && localUser) {
  //       console.log("rejoining");
  //       leave().then(() => {
  //         join(appid, channel, token).then(() => {
  //           setLocalUser({
  //             ...localUser,

  //           });
  //         });
  //       });
  //     }
  //   };
  //   refresh();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [localUser]);

  const leaveMeeting = async () => {
    //console.log("ass");

    console.log("IN leaveMeeting function");
    socket.emit(events.LEAVE_CHANNEL, {
      channel,
      user: localUser,
    });
    leave();
    //socket.disconnect();
    //history.goBack();
    history.push("/");
  };

  const getReplaced = async () => {
    console.log("LEAVE MESSAGE RECEIVED (Replace function)");
    leave();
    //socket.disconnect();
    //history.goBack();
    history.push("/");
  };

  // console.log("AUDIO TRACK DEBUGGING");
  // console.log(localUser);
  // console.log(remoteUsers);
  // console.log(remoteAgoraUsers);
  // console.log("Connection State:");
  // console.log(client.connectionState);
  // client.on("connection-state-change", (curState, revState, reason) => {
  //   console.log(curState);
  //   console.log(revState);
  //   console.log(reason);
  // });

  return localUser ? (
    <Call
      channel={channel}
      localUser={localUser}
      localAudioTrack={localAudioTrack}
      remoteUsers={remoteAgoraUsers}
      remoteUserData={remoteUserData}
      leaveMeeting={leaveMeeting}
      setLocalUser={setLocalUser}
    />
  ) : (
    <Loading />
  );
};

export default CallPage;
