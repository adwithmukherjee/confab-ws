import { useContext, useState, useRef } from "react";
import UserContext from "../context/UserContext";
import {
  auth,
  updateUser,
  storage,
  updateUserPhotoURL,
  updateUserDisplayName,
} from "../api/firebase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { isMobile } from "react-device-detect";
import titleImg from "../assets/title.svg";
import { useHistory } from "react-router-dom";

const CreateProfilePage = () => {
  const { user, setUser } = useContext(UserContext);

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(user.photoURL);
  const [progress, setProgress] = useState(0);
  const [displayName, setDisplayName] = useState(user.displayName);
  const history = useHistory();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      setImageURL(URL.createObjectURL(img));
    }
  };

  const onClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = () => {
    setUser((user) => {
      return { ...user, displayName };
    });
    updateUserDisplayName(displayName);
    if (image) {
      uploadImage();
    } else {
      history.push("/");
    }

    //setIsNewUser(false)
  };

  const uploadImage = (next) => {
    const uploadTask = storage
      .ref()
      .child("users/" + auth.currentUser.email)
      .put(image);

    uploadTask.then(() => {
      console.log("success");
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        setUser((user) => {
          return { ...user, photoURL: url };
        });
        updateUserPhotoURL(url);
        history.push("/");
      });
    });
  };

  function ConfabTitle({ style }) {
    /* TODO: why is this h1 not rendering as bold as it should be? issue with font file / font-face? */
    return (
      <img
        src={titleImg}
        style={{
          maxWidth: isMobile ? "80%" : "100%",
          // transform: isMobile ? "translate(-10%)" : "none",
          ...style,
        }}
        alt="CONFAB"
      />
    );
  }

  const hiddenFileInput = useRef(null);

  return (
    <div className="landing-container-1">
      <div
        className="landing-container-2"
        style={{
          justifyContent: "space-around",
          height: "70%",
          width: isMobile ? "90%" : "70%",
        }}
      >
        <ConfabTitle />
        <div
          style={{
            marginTop: "10vh",
            flex: 1,
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={imageURL}
            style={{
              width: 100,
              height: 100,
              margin: "auto",
              borderRadius: "40%",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
            }}
            alt="profile"
          ></img>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Button variant="outlined" onClick={onClick}>
            {" "}
            Upload image{" "}
          </Button>
          <input
            type="file"
            id="single"
            accept="image/*"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={onImageChange}
          />
        </div>
        <div
          style={{
            flex: 1,
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={displayName}
            onChange={(event) => {
              setDisplayName(event.target.value);
            }}
            style={{}}
          />
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
              marginBottom: 20,
              fontSize: "smaller",
              width: isMobile ? "100%" : "60%",
            }}
          >
            Your name and profile picture is how others will know it's you in
            Confab. This will be the only time you can edit your name yourself.
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              marginTop: 40,
              width: 140,
              marginBottom: 20,
              backgroundColor: "#4285F4",
            }}
          >
            {" "}
            SAVE{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;
