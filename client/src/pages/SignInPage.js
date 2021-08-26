import GoogleButton from "react-google-button";
import firebase from "firebase/app";
import "firebase/auth";
import keys from "../keys";
import { useEffect } from "react";

const SignInPage = () => {
  useEffect(() => {
    firebase.initializeApp(keys.FIREBASE_CONFIG);
  }, []);
  return (
    <div>
      Sign in Page
      <GoogleButton
        onClick={async () => {
          const googleAuth = window.gapi.auth2.getAuthInstance();
          const googleUser = await googleAuth.signIn();
          const token = googleUser.getAuthResponse().id_token;

          const credential = firebase.auth.GoogleAuthProvider.credential(token);

          firebase
            .auth()
            .setPersistence(
              process.env.NODE_ENV === "production"
                ? firebase.auth.Auth.Persistence.LOCAL
                : firebase.auth.Auth.Persistence.SESSION
            )
            .then(() => {
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(({ user }) => {
                  const { profile, email, photoURL, displayName } = user;
                  console.log(firebase.auth().currentUser);
                });
            });
        }}
      />
    </div>
  );
};

export default SignInPage;
