import {
  ILocalVideoTrack,
  IRemoteVideoTrack,
  ILocalAudioTrack,
  IRemoteAudioTrack,
} from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";

export interface VideoPlayerProps {
  //videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
  isLocal: boolean;
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  //   useEffect(() => {
  //     if (!container.current) return;
  //     props.videoTrack?.play(container.current);
  //     return () => {
  //       props.videoTrack?.stop();
  //     };
  //   }, [container, props.videoTrack]);
  useEffect(() => {
    if (!props.isLocal) {
      console.log("refreshed?");
      props.audioTrack?.play();
    }

    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack, props.isLocal]);
  return (
    <div
      ref={container}
      className="video-player"
      style={{ width: "0px", height: "0px" }}
    ></div>
  );
};

export default MediaPlayer;
