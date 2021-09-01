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
          ? firebase.auth.Auth.Persistence.SESSION //CHANGE THIS BACK TO LOCAL AFTER TESTING
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
  await auth.signOut();
};

const createCall = () => {
  const db = firebase.firestore();
  const { email } = firebase.auth().currentUser;

  const channel = new Promise((resolve, reject) => {
    db.collection("meetings")
      .add({
        // ended: false,
        // lastActive: new Date(),
        creatorRef: db.doc("users/" + email),
      })
      .then((docRef) => {
        db.collection("meetings")
          .doc(docRef.id)
          .collection("currentAttendees")
          .doc(email)
          .set({
            isHost: true,
          })
          .then(() => {
            resolve(docRef.id);
          });
      })
      .catch((err) => {
        reject(err);
      });
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

const updateUserPhotoURL = (photoURL) => {
  const db = firebase.firestore();
  const { email } = firebase.auth().currentUser;
  if (photoURL && photoURL !== "") {
    db.collection("users").doc(email).set(
      {
        photoURL,
      },
      { merge: true }
    );
  }
};

const updateUserDisplayName = (displayName) => {
  const db = firebase.firestore();
  const { email } = firebase.auth().currentUser;
  if (displayName && displayName !== "") {
    db.collection("users").doc(email).set(
      {
        displayName,
      },
      { merge: true }
    );
  }
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
