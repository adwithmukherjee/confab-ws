import { useState, useEffect } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
} from "agora-rtc-sdk-ng";

export default function useAgora(
  client: IAgoraRTCClient | undefined,
  playSound: Function
): {
  localAudioTrack: ILocalAudioTrack | undefined;
  // localVideoTrack: ILocalVideoTrack | undefined,
  joinState: boolean;
  leave: () => Promise<void>;
  join: Function;
  remoteUsers: IAgoraRTCRemoteUser[];
} {
  // const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | undefined>(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<
    ILocalAudioTrack | undefined
  >(undefined);

  const [joinState, setJoinState] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig
  ): Promise<IMicrophoneAudioTrack> {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack(
      audioConfig
    );

    setLocalAudioTrack(microphoneTrack);
    //   setLocalVideoTrack(cameraTrack);
    return microphoneTrack;
  }

  async function join(
    appid: string,
    channel: string,
    token?: string,
    uid?: string | number | null
  ) {
    if (!client) return;
    const microphoneTrack = await createLocalTracks({
      encoderConfig: "speech_standard",
    });

    await client.join(appid, channel, token || null);
    await client.publish([microphoneTrack]);

    (window as any).client = client;

    //  (window as any).videoTrack = cameraTrack;

    (window as any).localStream = microphoneTrack.getMediaStreamTrack();
    setJoinState(true);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    // if (localVideoTrack) {
    //   localVideoTrack.stop();
    //   localVideoTrack.close();
    // }
    setRemoteUsers([]);
    setJoinState(false);
    await client?.leave();
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video"
    ) => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      playSound();
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      //console.log(''+ user.uid + 'left')
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    // localVideoTrack,
    joinState,
    leave,
    join,
    remoteUsers,
  };
}
