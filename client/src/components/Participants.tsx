import React from "react";
import Participant from "./Participant";
import MuiAlert from "@material-ui/lab/Alert";
import { UserObject, useStyles } from "./Call";
import { AgoraUserObject } from "./Call";
import { Snackbar } from "@material-ui/core";
import { IAgoraRTCRemoteUser, ILocalAudioTrack } from "agora-rtc-sdk-ng";
import { isMobile } from "react-device-detect";

export interface ParticipantsProps {
  me: UserObject | undefined;
  localAudioTrack: ILocalAudioTrack | undefined;
  users: { [uid: string]: IAgoraRTCRemoteUser };
  userData: {
    [uid: string]: UserObject;
  };
  setLocalOpen: (val: boolean) => void;
  setRemoteOpen: (val: boolean) => void;
  setSelectedUser: (user: UserObject | undefined) => void;
}

const getGridTemplateColumns = (numberOfParticipants: number): string => {
  if (numberOfParticipants === 1) {
    return "0fr";
  } else if (numberOfParticipants === 2) {
    return "0fr 0fr";
  } else if (numberOfParticipants === 3) {
    return "0fr  0fr 0fr";
  } else {
    return "1fr 1fr 1fr 1fr";
  }
};

const Participants = (props: ParticipantsProps) => {
  const me = props.me;
  const users = props.users;
  const userData = props.userData;

  // console.log(me);
  // console.log(users);
  const classes = useStyles();
  const meParticipant = 1;
  const addParticipant = 1;
  const numberOfParticipants =
    meParticipant + addParticipant + (Object.keys(users).length ?? 0);

  //Remove this once redesign is finalized
  const gridTemplateColumns = getGridTemplateColumns(numberOfParticipants);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const addParticipantClicked = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setSnackbarOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const Alert = (props: any) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 0fr)" : "repeat(4, 0fr)",
      }}
    >
      {/* {users &&
        users
          .filter((user: AgoraUserObject | undefined) => {
            return user?.isHost;
          })
          .map((user: AgoraUserObject | undefined) => {
            return (
              <Participant
                user={user}
                onClick={() => {
                  props.setSelectedUser(user);
                  props.setRemoteOpen(true);
                }}
                isLocal={false}
                isAddParticipant={false}
              />
            );
          })} */}
      {me && (
        <Participant
          userData={me}
          audioTrack={props.localAudioTrack}
          onClick={() => {
            //props.setSelectedUser(me);
            props.setLocalOpen(true);
          }}
          isLocal={true}
          isAddParticipant={false}
        />
      )}

      {Object.keys(users).map((uid) => {
        const remoteUser = users[uid];
        const remoteUserData = userData[uid];
        return (
          <Participant
            userData={remoteUserData}
            audioTrack={remoteUser.audioTrack}
            onClick={() => {
              props.setSelectedUser(remoteUserData);
              props.setRemoteOpen(true);
            }}
            isLocal={false}
            isAddParticipant={false}
          />
        );
      })}
      {/* {users &&
        users.map((user: AgoraUserObject | undefined) => {
          if (user && !user.isHost) {
            return (
              <Participant
                user={user}
                onClick={() => {
                  props.setSelectedUser(user);
                  props.setRemoteOpen(true);
                }}
                isLocal={false}
                isAddParticipant={false}
              />
            );
          } else {
            return null;
          }
        })} */}
      {me && (
        <Participant
          userData={me}
          audioTrack={props.localAudioTrack}
          onClick={() => {
            addParticipantClicked();
          }}
          isLocal={true}
          isAddParticipant={true}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert severity="success">Room Link Copied</Alert>
      </Snackbar>
    </div>
  );
};

export default Participants;
