const { v4: uuidv4 } = require("uuid");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Meeting = mongoose.model("meetings");
const User = mongoose.model("users");

//here we are exporting a function that establishes authRoutes
//with app as an argument. It allows this fn to be called
//in index.js with the Express app instantiated there
module.exports = (app) => {
  app.post("/api/create_meeting", requireLogin, async (req, res) => {
    const uid = uuidv4();
    const meeting = new Meeting({
      uid,
      creator: req.user.id,
      dateCreated: Date.now(),
    });

    await meeting.save();
    res.send({ uid });
  });

  app.post("/api/update_photoURL", requireLogin, async (req, res) => {
    if (req.body.photoURL) {
      try {
        await User.collection.updateOne(
          { googleId: req.user.googleId },
          { $set: { photoURL: req.body.photoURL } }
        );
        res.sendStatus(200);
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(500);
    }
  });

  app.post("/api/update_displayName", requireLogin, async (req, res) => {
    if (req.body.displayName) {
      try {
        await User.collection.updateOne(
          { googleId: req.user.googleId },
          { $set: { displayName: req.body.displayName } }
        );
        res.sendStatus(200);
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(500);
    }
  });
};
