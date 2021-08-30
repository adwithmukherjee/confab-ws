import { useContext, useEffect, useRef, useState } from "react";
import useAgora from "../hooks/useAgora";
import AgoraRTC from "agora-rtc-sdk-ng";
import keys from "../keys";
import { RtmTokenBuilder, RtcRole, RtcTokenBuilder } from "agora-access-token";
import { useParams, useHistory, Prompt } from "react-router-dom";
import UserContext from "../context/UserContext";
import Call, { AgoraUserObject, UserObject } from "../components/Call";
import { socket } from "../api/sockets/sockets";
import events from "../api/sockets/events";
import Loading from "../components/Loading";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

function convertFromAgoraUser(user: AgoraUserObject): UserObject {
  const { audioTrack, ...rest } = user;
  return rest;
}

const CallPage = () => {
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

  const [localUser, setLocalUser] = useState<AgoraUserObject | undefined>(
    undefined
  );

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
  const [appid] = useState(keys.AGORA_APP_ID);
  const [token] = useState(
    RtcTokenBuilder.buildTokenWithUid(
      keys.AGORA_APP_ID,
      keys.AGORA_SECRET,
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
        user: convertFromAgoraUser(localUser),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteAgoraUsers]);

  const setRemoteUserState = ({ users }: { users: UserObject[] }) => {
    console.log("receiving");
    const localUser = localUserRef.current;
    const remoteAgoraUsers = remoteAgoraUsersRef.current;
    console.log(users);
    // console.log(localUser);
    //console.log(remoteAgoraUsers);
    // console.log(localAudioTrack);
    // console.log(localAudioTrackRef.current);
    if (localUser && remoteAgoraUsers) {
      const remoteUserList = users.map((remoteUser) => {
        const audioTrack = remoteAgoraUsers.find((val) => {
          return val.uid.toString() === remoteUser.uid;
        })?.audioTrack;
        return { ...remoteUser, audioTrack };
      });

      setRemoteUsers(
        remoteUserList.filter((remoteUser) => {
          return remoteUser.user.email !== localUser.user.email;
        })
      );
    } else {
      //console.log("no remote users");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket " + socket.id);
    });

    socket.on(events.UPDATE_USER, setRemoteUserState);
    socket.on(events.LEAVE_CHANNEL, getReplaced);
    socket.on(events.JOIN_CHANNEL, ({ user }: { user: UserObject }) => {
      console.log(user);
      setLocalUser({
        ...user,
        audioTrack: localAudioTrackRef.current,
      });
      setJoinedOnce(true);
    });

    return () => {
      leave().then(() => {
        socket.emit(events.LEAVE_CHANNEL, {
          channel,
          user: localUser && convertFromAgoraUser(localUser),
        });
        socket.off(events.UPDATE_USER, setRemoteUserState);
      });

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
        user: convertFromAgoraUser(localUser),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser]);

  useEffect(() => {
    const refresh = () => {
      console.log("ass");
      if (localUser?.audioTrack === undefined && joinedOnce && localUser) {
        leave().then(() => {
          join(appid, channel, token).then(() => {
            setLocalUser({
              ...localUser,
              audioTrack: localAudioTrackRef.current,
            });
          });
        });
      }
    };
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser?.audioTrack]);

  const leaveMeeting = async () => {
    //console.log("ass");
    await leave();
    socket.emit(events.LEAVE_CHANNEL, {
      channel,
      user: localUser && convertFromAgoraUser(localUser),
    });
    //socket.disconnect();
    history.push("/");
  };

  const getReplaced = async () => {
    await leave();
    //socket.disconnect();
    history.push("/");
  };

  console.log("AUDIO TRACK DEBUGGING");
  console.log(localUser);
  console.log(remoteUsers);

  return localUser ? (
    <Call
      channel={channel}
      localUser={localUser}
      localAudioTrack={localAudioTrack}
      remoteUsers={remoteUsers}
      leaveMeeting={leaveMeeting}
      setLocalUser={setLocalUser}
    />
  ) : (
    <Loading />
  );
};

export default CallPage;
