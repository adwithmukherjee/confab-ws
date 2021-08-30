import { useContext, useEffect } from "react";
import GoogleButton from "react-google-button";
import { signInWithGoogle } from "../api/firebase";
import UserContext from "../context/UserContext";
import keys from "../keys";
import { isMobile } from "react-device-detect";
import { ConfabTitleWithTagline, Footer } from "./WaitlistPage";
import { Typography } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import { useHistory } from "react-router-dom";
import { blue } from "@material-ui/core/colors";

const SignInPage = () => {
  const { setUser, setLoading, setNewUser } = useContext(UserContext);
  const history = useHistory();

  const signIn = () => {
    console.log("Signing In");
    signInWithGoogle().then((user) => {
      if (user.newUser) {
        console.log("create pages");

        setUser(user.user);
        setNewUser(true);
      } else {
        setUser(user.user);
      }
    });
  };

  return (
    <div
      className="landing-container-1"
      style={{ position: "relative", height: "100vh" }}
    >
      {/* <AppBar position="static" color="transparent" elevation={0}></AppBar> */}
      <div
        className="landing-container-2"
        style={{
          height: isMobile ? "80vh" : "70vh",
          alignItems: "center",
          width: isMobile ? "95%" : "60%",
        }}
      >
        <ConfabTitleWithTagline />

        <Typography
          variant="body"
          style={{
            color: grey[600],
            //marginTop: "1em",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <GoogleButton style={{ marginBottom: "1.5vh" }} onClick={signIn} />
          Sign in with your work email
        </Typography>

        <Typography
          variant="body"
          style={{
            color: grey[400],
            //marginTop: "1em",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            fontSize: isMobile ? 12 : 14,
            maxWidth: isMobile ? "100%" : "60%",
          }}
        >
          <div>
            By clicking 'Sign In With Google', you acknowledge that you have
            read and understood, and agree to Confab’s{" "}
            <a href="/terms-of-service.html" style={{ color: blue[600] }}>
              Terms{" "}
            </a>
            and{" "}
            <a href="/privacy-policy.html" style={{ color: blue[600] }}>
              Privacy Policy
            </a>
            .
          </div>
        </Typography>
      </div>

      <Footer
        style={{
          position: "absolute",
          bottom: "0vh",
          width: "97%",
          marginLeft: "1.5%",
        }}
      />
    </div>
  );
};
export default SignInPage;
