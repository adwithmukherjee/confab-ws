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

  const setRemoteUserState = ({ users }: { users: UserObject[] }) => {
    console.log("receiving");
    const localUser = localUserRef.current;
    const remoteAgoraUsers = remoteAgoraUsersRef.current;
    // console.log(users);
    // console.log(localUser);
    // console.log(remoteAgoraUsers);
    // console.log(localAudioTrack);
    // console.log(localAudioTrackRef.current);
    // if (localUser) {
    //   setLocalUser({ ...localUser, audioTrack: localAudioTrackRef.current });
    // }
    if (localUser && remoteAgoraUsers && remoteAgoraUsers.length > 0) {
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

    return () => {
      leave();
      socket.emit(events.LEAVE_CHANNEL, { channel, user });
      socket.off(events.UPDATE_USER, setRemoteUserState);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    join(appid, channel, token);
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
      setLocalUser({
        user,
        isHost: false,
        muted: false,
        audioTrack: localAudioTrack,
        uid: client.uid?.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinState, user]);

  //   useEffect(() => {
  //     console.log(localUser);
  //   }, [localUser]);

  /*EVERY TIME LOCAL USER STATE CHANGES, EMIT TO WS CONNECTION*/
  useEffect(() => {
    if (localUser && socket.connected) {
      console.log("emitting!");
      socket.emit(events.UPDATE_USER, {
        channel,
        user: convertFromAgoraUser(localUser),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser]);

  useEffect(() => {
    //let interval;

    const interval = setInterval(() => {
      if (localUser) {
        console.log("emitting");
        socket.emit(events.UPDATE_USER, {
          channel,
          user: convertFromAgoraUser(localUser),
        });
      }
    }, 1000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leaveMeeting = () => {
    //console.log("ass");
    leave();
    socket.emit(events.LEAVE_CHANNEL, { channel, user });
    socket.disconnect();
    history.push(`/`);
  };

  console.log(localUser?.audioTrack);
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
    <div> Loading </div>
  );
};

export default CallPage;
