import React from "react";
import Participant from "./Participant";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./Call";
import { AgoraUserObject } from "./Call";
import { Snackbar } from "@material-ui/core";

export interface ParticipantsProps {
  me: AgoraUserObject | undefined;
  users: AgoraUserObject[] | undefined;
  setLocalOpen: (val: boolean) => void;
  setRemoteOpen: (val: boolean) => void;
  setSelectedUser: (user: AgoraUserObject | undefined) => void;
}

const getGridTemplateColumns = (numberOfParticipants: number): string => {
  if (numberOfParticipants === 1) {
    return "1fr";
  } else if (numberOfParticipants === 2) {
    return "1fr 1fr";
  } else {
    return "1fr 1fr 1fr";
  }
};

const Participants = (props: ParticipantsProps) => {
  const me = props.me;
  const users = props.users;

  // console.log(me);
  // console.log(users);
  const classes = useStyles();
  const meParticipant = 1;
  const addParticipant = 1;
  const numberOfParticipants =
    meParticipant + addParticipant + (users?.length ?? 0);
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
        gridTemplateColumns: gridTemplateColumns,
      }}
    >
      {users &&
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
          })}
      <Participant
        user={me}
        onClick={() => {
          //props.setSelectedUser(me);
          props.setLocalOpen(true);
        }}
        isLocal={true}
        isAddParticipant={false}
      />

      {users &&
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
        })}
      <Participant
        user={me}
        onClick={() => {
          addParticipantClicked();
        }}
        isLocal={true}
        isAddParticipant={true}
      />
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
