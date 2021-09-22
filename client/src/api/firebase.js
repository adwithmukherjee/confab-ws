import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import keys from "../keys";

firebase.initializeApp(keys.FIREBASE_CONFIG);

const auth = firebase.auth();
const storage = firebase.storage();

const getUser = (email) => {
  const user = new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        resolve({ ...doc.data(), email });
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

  const provider = new firebase.auth.GoogleAuthProvider();
  let userRecord = {};

  const user = new Promise((resolve, reject) => {
    firebase
      .auth()
      .setPersistence(
        process.env.NODE_ENV === "production"
          ? firebase.auth.Auth.Persistence.LOCAL //CHANGE THIS BACK TO LOCAL AFTER TESTING
          : firebase.auth.Auth.Persistence.SESSION
      )
      .then(() => {
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(({ user }) => {
            console.log(user);
            const { email, displayName, photoURL } = user;
            userRecord = { displayName, profile: "", photoURL };

            firebase
              .firestore()
              .collection("users")
              .doc(email)
              .get()
              .then((doc) => {
                if (doc.exists) {
                  const val = { ...doc.data(), email };
                  resolve({ newUser: false, user: val });
                } else {
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(email)
                    .set(userRecord)
                    .then(() => {
                      const val = { ...userRecord, email };
                      resolve({ newUser: true, user: val });
                    });
                }
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
  await axios.get("/api/logout");
};

const createCall = () => {
  const channel = new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("/api/create_meeting");
      if (res.data) {
        console.log(res.data.uid);
        resolve(res.data.uid);
      } else {
        resolve(undefined);
      }
    } catch (err) {
      console.log(err);
      resolve(undefined);
    }
  });

  return channel;
};

const getCalEventDetails = (channel) => {
  const db = firebase.firestore().collection("meetings");

  const meetingInfo = new Promise((resolve, reject) => {
    db.doc(channel)
      .get()
      .then((doc) => {
        const { gcal_event } = doc.data();
        if (gcal_event) {
          resolve(gcal_event);
        } else {
          resolve(undefined);
        }
      })
      .catch(() => {
        resolve(undefined);
      });
  });
  return meetingInfo;
};

const updateUserPhotoURL = async (photoURL) => {
  await axios.post("/api/update_photoURL", { photoURL });
};

const updateUserDisplayName = async (displayName) => {
  await axios.post("/api/update_displayName", { displayName });
};

export {
  auth,
  storage,
  getUser,
  signInWithGoogle,
  signOut,
  createCall,
  getCalEventDetails,
  updateUserPhotoURL,
  updateUserDisplayName,
};
