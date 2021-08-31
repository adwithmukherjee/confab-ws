import { useEffect, useState, MouseEventHandler } from "react";
import { AgoraUserObject } from "./Call";
import { useStyles } from "./Call";
import { Paper } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import shadows from "@material-ui/core/styles/shadows";
import {
  AiOutlinePlusCircle,
  AiOutlineAudioMuted,
  AiOutlineConsoleSql,
} from "react-icons/ai";
import MediaPlayer from "./MediaPlayer";

export interface ParticipantProps {
  // channel: String;
  // uid: String | undefined;
  // remoteUsers: any;
  user: AgoraUserObject | undefined;
  onClick: MouseEventHandler<HTMLImageElement>;
  isLocal: boolean;
  isAddParticipant: boolean;
}

const Participant = (props: ParticipantProps) => {
  // interface ParticipantObject {
  //   email: String;
  //   photoURL: string;
  //   profile: String;
  //   displayName: string | undefined;
  // }
  // const [participant, setParticipant] = useState<
  //   UserObject | undefined
  // >();
  const [audio, setAudio] = useState<number>(0);

  // console.log(props.user?.user.email);
  // console.log(props.user?.audioTrack);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(props.user);
      if (props.user?.audioTrack && !props.isAddParticipant) {
        //console.log(props.user?.audioTrack.getVolumeLevel());
        setAudio(props.user?.audioTrack.getVolumeLevel());
      }
    }, 100);
    return () => clearInterval(interval);
  }, [props.isAddParticipant, props.user?.audioTrack]);

  const classes = useStyles();

  return props.user && props.user.user ? (
    <div className={classes.participant} onClick={props.onClick}>
      <Paper
        elevation={3}
        className={classes.paper}
        style={{
          borderRadius: isMobile ? 35 : 50,
          boxShadow: props.isAddParticipant
            ? shadows[3]
            : audio > 0.02
            ? `0 0 9pt ${
                -2 + 3.5 * Math.log(13 * audio + 0.6)
              }pt cornflowerblue`
            : shadows[3],
        }}
      >
        {props.isAddParticipant ? (
          <div
            style={{
              backgroundColor: "#CDCDCD",
              width: "100%",
              height: "100%",
              borderRadius: isMobile ? 35 : 50,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: isMobile ? 80 : 112,
              }}
            >
              <AiOutlinePlusCircle color="white" size={60} />
            </div>
          </div>
        ) : (
          <img
            src={props.user.user.photoURL}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              borderRadius: isMobile ? 35 : 50,
              opacity:
                props.user.audioTrack === undefined && !props.user.muted
                  ? 0.3
                  : 1,
            }}
          ></img>
        )}
        {props.user.muted && !props.isAddParticipant && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              display: "flex",
              width: 30,
              height: 30,
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={classes.mute}>
              <AiOutlineAudioMuted />
            </div>
          </div>
        )}
      </Paper>
      {!props.isAddParticipant && (
        <div className={classes.label}>
          {props.user.user.displayName + (props.user.isHost ? " (Host)" : "")}
        </div>
      )}
      <MediaPlayer
        audioTrack={props.user.audioTrack}
        isLocal={props.isLocal}
      ></MediaPlayer>
    </div>
  ) : null;
};

export default Participant;
