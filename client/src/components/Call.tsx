import React, { useState, useEffect } from "react";
import AgoraRTC, {
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
} from "agora-rtc-sdk-ng";

import QRCodeDisplay from "./QRCodeDisplay";
import { isMobile } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { IconButton, SnackbarContent } from "@material-ui/core";
import { AiFillCamera } from "react-icons/ai";
import { BottomSheet } from "react-spring-bottom-sheet";
import "./bottomsheetStyle.css";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import Snackbar from "@material-ui/core/Snackbar";

import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Participants from "./Participants";
import shadows from "@material-ui/core/styles/shadows";
import { blue } from "@material-ui/core/colors";
import CancelIcon from "@material-ui/icons/Cancel";
import EventIcon from "@material-ui/icons/Event";
import {
  auth,
  getCalEventDetails,
  storage,
  updateUserPhotoURL,
} from "../api/firebase";
import { ConfabTitleWithoutSlogan } from "../pages/WaitlistPage";
const titleImg = require("../assets/title.svg");

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

export interface UserObject {
  isHost: boolean;
  muted: boolean;
  uid: string | undefined;
  user:
    | {
        displayName: string;
        email: string;
        photoURL: string;
        profile: string;
      }
    | undefined;
}

export interface AgoraUserObject {
  isHost: boolean;
  muted: boolean;
  uid: string | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
  user:
    | {
        displayName: string;
        email: string;
        photoURL: string;
        profile: string;
      }
    | undefined;
}

interface CallProps {
  channel: string;
  localUser: UserObject;
  localAudioTrack: ILocalAudioTrack | undefined;
  remoteUsers: { [uid: string]: IAgoraRTCRemoteUser };
  remoteUserData: {
    [uid: string]: UserObject;
  };
  leaveMeeting: () => void;
  setLocalUser: Function;
}

////////////

const Call = (props: CallProps) => {
  const {
    channel,
    leaveMeeting,
    localUser,
    localAudioTrack,
    setLocalUser,
    remoteUsers,
    remoteUserData,
  } = props;

  const playSound = () => {
    const audioElement = document.getElementsByClassName(
      "audio"
    )[0] as HTMLAudioElement;
    if (audioElement) {
      audioElement.play();
    }
  };

  ////////////// CAL EVENT PULL ///////////

  const [calendarEvent, setCalendarEvent] = useState<any>(undefined);
  useEffect(() => {
    getCalEventDetails().then((event) => {
      console.log(event);
      if (event) {
        setCalendarEvent(event);
      }
      /*TODO: ASSIGN HOST HERE*/
    });
  }, []);

  ///////////////////////////////////
  /////////// UI STUFF //////////////
  //////////////////////////////////

  const classes = useStyles();

  //upsell banner

  const [upsellBannerOpen, setUpsellBannerOpen] = useState(true);
  const handleCloseUpsellSnackbar = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setUpsellBannerOpen(false);
  };

  //title

  function ConfabTitle({}) {
    /* TODO: why is this h1 not rendering as bold as it should be? issue with font file / font-face? */
    return (
      <img
        src={titleImg}
        style={{
          maxWidth: isMobile ? "80%" : "100%",
        }}
        alt="AIRWAVE"
      />
    );
  }

  //bottom sheet
  const [localOpen, setLocalOpen] = useState(false);
  const [remoteOpen, setRemoteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserObject | undefined>();

  //image upload

  const [image, setImage] = useState<Blob | undefined>(undefined);
  const [imageURL, setImageURL] = useState<string | undefined>(
    localUser.user?.photoURL
  );

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      setImageURL(URL.createObjectURL(img));
    }
  };

  const uploadImage = () => {
    if (auth.currentUser && image) {
      console.log("uploading");

      const uploadTask = storage
        .ref()
        .child("users/" + auth.currentUser.email)
        .put(image);

      uploadTask.then(() => {
        console.log("success");
        uploadTask.snapshot.ref.getDownloadURL().then((url: string) => {
          setLocalUser((localUser: AgoraUserObject | undefined) => {
            if (localUser && localUser.user) {
              const { photoURL, ...user } = localUser?.user;
              return { ...localUser, user: { ...user, photoURL: url } };
            }
          });
          updateUserPhotoURL(url);
          console.log("uploaded");
        });
      });
    }
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  //////NOTEPAD//////

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (localUser.user) {
      const html = localUser.user.profile;
      const content = ContentState.createFromBlockArray(
        htmlToDraft(html).contentBlocks
      );
      setEditorState(EditorState.createWithContent(content));
    }
  }, []);

  useEffect(() => {
    //get profile for first time on load
    if (localUser) {
      const profileHTML = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );

      setLocalUser((localUser: AgoraUserObject | undefined) => {
        if (localUser && localUser.user) {
          const { profile, ...user } = localUser?.user;
          return { ...localUser, user: { ...user, profile: profileHTML } };
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState]);

  /////MUTE/////
  const handleMute = () => {
    setLocalUser((localUser: AgoraUserObject | undefined) => {
      if (localUser) {
        const { muted } = localUser;
        return { ...localUser, muted: !muted };
      }
    });
  };

  useEffect(() => {
    if (localUser) {
      const changeMute = async () => {
        await localAudioTrack?.setMuted(localUser.muted);
        //console.log("mute changed")
      };
      changeMute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser?.muted, localAudioTrack]);

  return (
    <div>
      <audio className="audio" style={{ height: 0, width: 0 }}>
        <source src="https://firebasestorage.googleapis.com/v0/b/huddle-7dff8.appspot.com/o/cork.mp3?alt=media&token=a80a2ddc-8e85-41f8-b38c-8df04d2f7289" />
      </audio>
      <div className="landing-container-1">
        <div className={classes.root}>
          {!isMobile && (
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              message="ass"
              color="blue"
              open={upsellBannerOpen}
              style={{ padding: 0 }}
              onClose={handleCloseUpsellSnackbar}
            >
              <SnackbarContent
                style={{
                  backgroundColor: "rgba(66,133,244,0.2)",
                  color: blue[800],
                  padding: 0,
                }}
                action={
                  <div
                    style={{
                      //maxWidth: "23vw",
                      maxWidth: "25vw",
                      display: "flex",
                      marginLeft: "-1vw",
                      alignItems: "center",

                      padding: 10,
                      paddingLeft: 15,
                      cursor: "pointer",
                    }}
                  >
                    <EventIcon style={{ marginRight: 15, color: blue[900] }} />
                    <a
                      href="https://workspace.google.com/marketplace/app/confab/192926803111"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: blue[800] }}
                    >
                      Get the Airwave Calendar Add-on to schedule rooms directly
                      from Google Calendar!
                    </a>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setUpsellBannerOpen(false);
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                }
              ></SnackbarContent>
            </Snackbar>
          )}
          <ConfabTitleWithoutSlogan titleStyle={{}} />
          <div
            style={
              {
                //position: "fixed",
                //top: isMobile ? 100 : 200,
              }
            }
          >
            {calendarEvent && (
              <h3 style={{ textAlign: "center" }}>{calendarEvent?.summary}</h3>
            )}
          </div>
          <BottomSheet
            open={localOpen}
            onDismiss={() => setLocalOpen(false)}
            snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
            scrollLocking={false}
            header={
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignSelf: "center",
                    alignItems: "flex-start",
                    marginLeft: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: "25px",
                      lineHeight: "40px",
                    }}
                  >
                    My Notepad
                  </div>
                  {localUser.user && <div>{localUser.user.email}</div>}
                </div>
                <div style={{ display: "flex" }}>
                  <Paper
                    elevation={0}
                    className={classes.paper}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: 22,
                      marginRight: 20,
                      boxShadow: "none",
                    }}
                  >
                    <label htmlFor="single">
                      <img
                        src={imageURL}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: 22,
                        }}
                      ></img>
                    </label>
                    <input
                      type="file"
                      id="single"
                      accept="image/*"
                      style={{
                        width: 0,
                        height: 0,
                        position: "absolute",
                        borderWidth: 0,
                        border: "none",
                        outline: 0,
                      }}
                      onChange={onImageChange}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        display: "flex",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className={classes.editPicture}>
                        <AiFillCamera />
                      </div>
                    </div>
                  </Paper>
                </div>
              </div>
            }
          >
            {/* <textarea
                className="prof-description"
                style={{
                  height: "30vh",
                  margin: 20,
                  fontSize: "22px",
                  width: "-webkit-fill-available",
                  color: "rgb(40,40,40)",
                  wordBreak: "break-word",
                  overflowY: "auto",
                }}
                placeholder="Add publicly visible comments, links, questions, and more here..."
                value={notes}
                onChange={updateProfileField}
              ></textarea> */}
            <div
              style={{
                width: "90%",
                height: "100%",
                margin: "auto",
              }}
            >
              <Editor
                toolbar={{
                  options: ["link", "emoji"],
                  link: { defaultTargetOption: "_blank" },
                }}
                editorState={editorState}
                wrapperStyle={{ height: "50vh" }}
                //editorStyle={{ height: "100%", border: "solid" }}
                placeholder="Add publicly visible comments, links, questions, and more here..."
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                onEditorStateChange={(edited) => {
                  setEditorState(edited);
                  // updateProfileField(
                  //   draftToHtml(convertToRaw(edited.getCurrentContent()))
                  // );
                  // console.log(
                  //   draftToHtml(convertToRaw(editorState.getCurrentContent()))
                  // );
                }}
              >
                <textarea
                  disabled
                  style={{
                    height: "30vh",
                    margin: 20,
                    fontSize: "22px",
                    width: "-webkit-fill-available",
                    color: "rgb(40,40,40)",
                    wordBreak: "break-word",
                    overflowY: "auto",
                    border: "solid",
                  }}
                  value={draftToHtml(
                    convertToRaw(editorState.getCurrentContent())
                  )}
                ></textarea>
              </Editor>
            </div>
          </BottomSheet>
          <BottomSheet
            open={remoteOpen}
            onDismiss={() => setRemoteOpen(false)}
            snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
            scrollLocking={false}
            header={
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    alignSelf: "center",
                    alignItems: "flex-start",
                    marginLeft: 20,
                  }}
                >
                  <div style={{ fontSize: "25px", lineHeight: "40px" }}>
                    {selectedUser &&
                      selectedUser.user &&
                      selectedUser.user.displayName + "'s Notepad"}
                  </div>
                  <div>
                    {selectedUser &&
                      selectedUser.user &&
                      selectedUser.user.email}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <Paper
                    elevation={0}
                    className={classes.paper}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: 22,
                      marginRight: 20,
                    }}
                  >
                    <img
                      src={
                        selectedUser &&
                        selectedUser.user &&
                        selectedUser.user.photoURL
                      }
                      alt=""
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: 22,
                      }}
                    ></img>
                  </Paper>
                </div>
              </div>
            }
          >
            {
              /* <p
                className="prof-description"
                style={{
                  height: "30vh",
                  margin: 20,
                  fontSize: "22px",
                  width: "-webkit-fill-available",
                  color: "rgb(77, 77, 77)",
                  wordBreak: "break-word",
                  overflowY: "auto",
                }}
              >
                {selectedUser && selectedUser.user.profile}
              </p> */
              selectedUser && (
                <div
                  style={{
                    height: "30vh",
                    margin: 20,
                    fontSize: "22px",
                    width: "-webkit-fill-available",
                    color: "rgb(40,40,40)",
                    wordBreak: "break-word",
                    overflowY: "auto",
                    userSelect: "text",
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedUser && selectedUser.user
                        ? selectedUser.user.profile
                        : "",
                  }}
                ></div>
              )
            }
          </BottomSheet>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: isMobile ? "2vh" : "3vh",
              overflow: "scroll",
              marginBottom: isMobile ? 20 : 100,
              maxHeight: "65vh",
            }}
          >
            <div>
              <div style={{ height: 50 }}></div>
              <Participants
                me={localUser}
                localAudioTrack={props.localAudioTrack}
                users={remoteUsers}
                userData={remoteUserData}
                setLocalOpen={(val: boolean) => setLocalOpen(val)}
                setRemoteOpen={(val: boolean) => setRemoteOpen(val)}
                setSelectedUser={(val: UserObject | undefined) => {
                  if (val) {
                    setSelectedUser(val);
                  }
                }}
              />
            </div>

            {!isMobile && <QRCodeDisplay channel={channel} />}
          </div>
          {/* <div style={{ display: "flex", height: "100px", width: "100%" }}></div> */}
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              flex: 1,
            }}
          ></div>
          <div className={classes.buttonGroup}>
            <Button variant="outlined" onClick={leaveMeeting}>
              {" "}
              Leave{" "}
            </Button>
            <div style={{ width: 80 }}></div>
            <Button variant="contained" color="secondary" onClick={handleMute}>
              {localUser?.muted ? "Unmute" : "Mute"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

type ChannelParams = {
  channelId: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: isMobile ? "90%" : "50%",
    height: isMobile ? "95%" : "100%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    //borderStyle: "solid"
  },
  title: {
    textAlign: "center",
    fontSize: isMobile ? "7vh" : "10vh",
    marginTop: 0,
    marginBottom: 0,
    position: "fixed",
    top: "0px",
  },
  participantGroup: {
    display: "flex",
    justifyContent: "center",
    //alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    overflow: "scroll",
  },
  qrCodeDisplayStyle: {
    backgroundColor: "#5B7992",
    flexDirection: "column",
    //width: isMobile ? "100%" : "50%",
    justifyContent: "flex-start",
    //justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      //margin: theme.spacing(2),
      // width: theme.spacing(14),
      // height: theme.spacing(10),
    },
    padding: "15px",
    borderRadius: "20px",
  },
  participant: {
    //borderStyle:"solid",
    flexDirection: "column",
    //width: isMobile ? "100%" : "50%",
    justifyContent: "flex-start",
    //justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    position: "relative",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
      width: isMobile ? theme.spacing(10) : theme.spacing(14),
      height: isMobile ? theme.spacing(10) : theme.spacing(14),
    },
  },
  mute: {
    zIndex: 2,
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[5],
  },
  editPicture: {
    position: "fixed",
    zIndex: 2,
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[5],
  },
  label: {
    height: "2vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    lineHeight: 1.2,

    textAlign: "center",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    //overflow: "clip",
    position: "relative",
  },
  qrCodeStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "clip",
    height: "60px",
    width: "60px",
    padding: "8px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  modal: {
    position: "absolute",
    width: isMobile ? "70%" : "50%",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonGroup: {
    width: isMobile ? "100%" : "50%",
    marginTop: "1vh",
    //borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    position: "fixed",
    bottom: 0,
  },
}));

export { useStyles };

export default Call;

