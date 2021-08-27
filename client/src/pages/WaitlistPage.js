import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import grey from "@material-ui/core/colors/grey";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import titleImg from "../assets/title.svg";
import logo from "../assets/logo.svg";
import heroImg from "../assets/hero-img.png";
// import { addToWaitlist } from "../firebase";

const WaitlistPage = ({ setLoggingIn }) => {
  const [success, setSuccess] = useState(undefined);
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const classes = useStyles();

  const handleSubmitWaitlist = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      // addToWaitlist(email).then((val) => {
      setSuccess(true);
      // });
    } else {
      setSuccess(false);
    }
  };
  // console.log(isMobile);

  return (
    <div className="landing-container-1">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          style={{ flexDirection: "column-reverse", alignItems: "flex-end" }}
        >
          <Typography
            variant="h6"
            style={{
              fontWeight: "lighter",
            }}
          >
            <a href="/contact-us" target="_blank">
              <Button
                style={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontWeight: "100",
                }}
              >
                Contact us
              </Button>
            </a>{" "}
            |{" "}
            <Button
              style={{
                fontFamily: '"Noto Sans", sans-serif',
                fontWeight: "100",
              }}
              href="/login"
              target="_blank"
            >
              Log in
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        className="landing-container-2"
        style={{ height: isMobile ? "70%" : "50%" }}
      >
        <ConfabTitleWithTagline />

        <div
          style={{
            display: "flex",
            alignItems: "column",
            maxWidth: isMobile ? "90vw" : "50vw",
          }}
        >
          <Paper
            component="form"
            className={classes.root}
            style={{
              //width: isMobile ? "60%" : "100%",
              borderStyle: "solid",
              borderWidth: 0.2,
            }}
          >
            <InputBase
              type="email"
              className={classes.input}
              placeholder="Enter your work email..."
              value={email}
              onChange={handleChange}
            />
          </Paper>
          <Paper style={{ backgroundColor: blue[600], marginLeft: "0.5vw" }}>
            <IconButton
              color="primary"
              className={classes.iconButton}
              onClick={handleSubmitWaitlist}
            >
              <NavigateNextIcon />
            </IconButton>
          </Paper>
        </div>
        <Typography
          variant="h5"
          style={{ marginTop: "2vh", marginBottom: "1vh" }}
        >
          OR
        </Typography>
        <div
          style={{
            display: "flex",
            // alignItems: "column",
            width: isMobile ? "85vw" : "50vw",
            alignItems: "center",
            justifyContent: "center",
            textAlign: isMobile ? "left" : "center",
            // border: "solid",
            padding: 4,
            // margin: "auto",
          }}
        >
          Skip the waitlist by getting the Google Calendar Add-on
          <Button
            variant="contained"
            color="primary"
            style={{
              marginLeft: 15,
              borderRadius: 2,
              backgroundColor: blue[600],
              padding: "0.5em",
            }}
            href="https://workspace.google.com/marketplace/app/confab/192926803111"
            target="_blank"
            rel="noreferrer"
          >
            Skip {!isMobile && "Waitlist"}
          </Button>
        </div>
        {/* <Divider className={classes.divider} orientation="vertical" /> */}

        {success ? (
          <Typography
            variant="body1"
            style={{ color: blue[600], marginTop: "1em", textAlign: "center" }}
          >
            You're on the list!
          </Typography>
        ) : success === undefined ? (
          <Typography
            variant="body1"
            style={{ color: grey[600], marginTop: "1em", textAlign: "center" }}
          ></Typography>
        ) : (
          <Typography
            variant="body1"
            style={{ color: red[600], marginTop: "1em", textAlign: "center" }}
          >
            Please enter a valid email address.
          </Typography>
        )}
      </div>
      <img
        src={heroImg}
        alt="Confab screenshots"
        style={{
          maxWidth: isMobile ? "95%" : "60%",
          marginTop: isMobile ? 0 : "2vh",
          marginBottom: "40px",
        }}
      />
      <Typography variant="body1">
        <ul
          className="branding"
          style={{
            maxWidth: isMobile ? "90%" : "65%",
            fontSize: isMobile ? "1vh+1vw" : "1vh+1vw",
            margin: "auto",
            listStyle: "none",
          }}
        >
          <li className={`custom-list audio`}>
            With Confab's drop-in audio conferencing, it's now easier than ever
            to have productive, efficient, and focused meetings
          </li>
          <li className={`custom-list cal`}>
            Schedule rooms directly from Google Calendar with the{" "}
            <a
              href="https://workspace.google.com/marketplace/app/confab/192926803111"
              target="_blank"
              rel="noreferrer"
              style={{ color: blue[700] }}
            >
              Confab Workspace add-on
            </a>{" "}
            and join on your desktop or mobile browser
          </li>
          <li className={`custom-list mirror`}>
            Never worry about how you look or where you are when joining a
            meeting
          </li>
          <li className={`custom-list person`}>
            Confab is designed to give you the mobility and flexibility you need
            for hybrid work
          </li>
        </ul>
      </Typography>

      <Footer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: "white",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
export default WaitlistPage;

export function Footer({ style }) {
  return (
    <footer
      style={{
        alignSelf: "stretch",
        width: "97%",
        margin: "auto",
        marginTop: "5em",
        marginBottom: "1.5vh",

        color: grey[500],
        fontSize: 12,
        ...style,
      }}
    >
      &copy; 2021 Big Mess Labs Inc. {isMobile && <br />} All Rights Reserved
      <span
        style={{
          float: "right",
          //paddingRight: "40px",
          color: grey[500],
        }}
      >
        <a
          href="/terms-of-service.html"
          style={{ marginRight: isMobile ? "2vw" : "5vw", color: grey[500] }}
          target="_blank"
        >
          Terms
        </a>
        <a
          href="/privacy-policy.html"
          style={{ marginRight: isMobile ? "2vw" : "4vw", color: grey[500] }}
          target="_blank"
        >
          Privacy
        </a>
        <a
          href="/contact-us"
          style={{ marginRight: "2vw", color: grey[500] }}
          target="_blank"
        >
          Contact Us
        </a>
      </span>
    </footer>
  );
}

function ConfabTitle({ style }) {
  /* TODO: why is this h1 not rendering as bold as it should be? issue with font file / font-face? */
  return (
    <img
      src={titleImg}
      style={{
        maxWidth: isMobile ? "100%" : "100%",
        margin: "auto",
        //transform: isMobile ? "translate(-10%)" : "none",
        ...style,
      }}
      alt="CONFAB"
    />
  );
}

export function ConfabTitleWithTagline({ titleStyle }) {
  return (
    <Typography
      variant="h1"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ConfabTitle style={titleStyle} />
      <Typography
        variant="h5"
        style={{
          fontWeight: "bold",
          marginTop: "-1vh",
          marginBottom: "2em",
          textAlign: "center",
          fontSize: isMobile ? 15 : 25,
        }}
      >
        Work at the speed of sound
      </Typography>
    </Typography>
  );
}
