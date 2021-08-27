import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import keys from "../keys";

firebase.initializeApp(keys.FIREBASE_CONFIG);

const auth = firebase.auth();

const getUser = (email) => {
  const user = new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        resolve(doc.data());
      })
      .catch(() => {
        resolve(undefined);
      });
  });

  return user;
};

const signInWithGoogle = async () => {
  const googleAuth = window.gapi.auth2.getAuthInstance();
  const googleUser = await googleAuth.signIn();
  const token = googleUser.getAuthResponse().id_token;

  const credential = firebase.auth.GoogleAuthProvider.credential(token);

  const user = new Promise((resolve, reject) => {
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
            const { email } = user;

            firebase
              .firestore()
              .collection("users")
              .doc(email)
              .get()
              .then((doc) => {
                resolve(doc.data());
              });
          })
          .catch((err) => {
            console.log(err);
            resolve(undefined);
          });
      })
      .catch((err) => {
        console.log(err);
        resolve(undefined);
      });
  });

  return user;
};

const signOut = async () => {
  await auth.signOut();
};

export { auth, getUser, signInWithGoogle, signOut };
