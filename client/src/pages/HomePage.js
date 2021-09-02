import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { isMobile } from "react-device-detect";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import calIcon from "../assets/cal-icon2.png";
import phoneIcon from "../assets/phone-icon.png";
import { Link, useHistory } from "react-router-dom";
import titleImg from "../assets/title.svg";
import { blue } from "@material-ui/core/colors";
import { createCall } from "../api/firebase";
import { ConfabTitleWithTagline } from "./WaitlistPage";

const HomePage = () => {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const [modalText, setModalText] = useState({ title: "", description: "" });

  useEffect(() => {
    console.log("HOME PAGE CLEANUP");
    if (window.localStream) {
      console.log(window.localStream);
      try {
        window.localStream.stop();
      } catch {
        console.log("FAILED TO CLOSE STREAM");
      }
    }
  }, []);

  function handleCreateRoom() {
    createCall().then((channel) => {
      history.push(`/call/${channel}`);
    });
  }

  const classes = useStyles();

  return (
    <div className="landing-container-1">
      <div className={classes.root}>
        <ConfabTitleWithTagline />

        <div className={classes.buttonGroup}>
          <div className={classes.buttons}>
            <Paper elevation={0} className={classes.paper}>
              {/* <AddBoxRoundedIcon
                style={{ fontSize: "500%" }}
                onClick={handleCreateRoom}
              /> */}
              <img
                src={phoneIcon}
                alt="Create Room"
                style={{ width: "90%", height: "90%", cursor: "pointer" }}
                onClick={handleCreateRoom}
              />
            </Paper>
            <div className={classes.label}> Start Room</div>
            <div className={classes.description}> </div>
          </div>
          <div style={{ width: isMobile ? 20 : 100 }}></div>
          <div className={classes.buttons}>
            <Paper elevation={0} className={classes.paper}>
              <a
                href="https://workspace.google.com/marketplace/app/confab/192926803111"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={calIcon}
                  alt="calendar"
                  style={{ width: "80%", height: "80%" }}
                />
              </a>
              
            </Paper>
            <div className={classes.label}>Get Calendar Add-on</div>
            <div className={classes.description}>
              {" "}
              For easy scheduling straight from{" "}
              <a
                href="http://calendar.google.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: blue[600] }}
              >
                Google Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    display: "flex",
    alignSelf: "flex-start",
    //alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    //: "solid",
  },
  title: {
    textAlign: "center",
    fontSize: isMobile ? "7vh" : "10vh",
  },
  buttonGroup: {
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    //border: "solid",
  },
  buttons: {
    flexDirection: "column",
    width: isMobile ? "100%" : "50%",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
  },
  label: {
    height: "1.4vh",
    fontSize: "2vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    width: "90%",
  },
  description: {
    height: "2vh",
    fontSize: "1.3vh",
    textAlign: "center",
    width: "80%",
    marginTop: "-0.2vh",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
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
}));

export default HomePage;
