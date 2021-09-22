import axios from "axios";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/storage";
const keys = require("../keys");

firebase.initializeApp(keys.FIREBASE_CONFIG);

const storage = firebase.storage();

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
  storage,
  signOut,
  createCall,
  getCalEventDetails,
  updateUserPhotoURL,
  updateUserDisplayName,
};
