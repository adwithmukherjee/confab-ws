const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  //argument 1: user is the same user passed as an argument into done() below. internal to Passport
  //done called after we complete another Auth step with Passport
  //user.id is a shortcut to the _id property stored in this user's instance in Mongo Collection. .NOT profile.id. Allows for the use of multiple Strategies.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id) //returns a user, which is handled using done() in .then
    .then((user) => {
      done(null, user);
    });
});

//creates a new instance of GoogleStrategy. Inside constructor go configuration for auth
//passport.use tells passport to use this fro auth
//accessToken flow acts as identifying user info we can use to
//create a new user in our database
//the second argument callback fn is called the instant a user is sent back to our server
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", //route for user coming back from Google with code
      proxy: true, //tells oauth to trust the proxy.
    },

    async (accessToken, refreshToken, profile, done) => {
      //check to see if profile.id already exists in DB
      //we call done() in both to conclude the callback and tell passport the user's identity
      console.log(profile);
      const existingUser = await User.findOne({ googleId: profile.id }); //query using mongoose. find first record with the same property as paramater obj. returns a Promise
      //Promise handling

      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile._json.email,
          photoURL: profile._json.picture,
          profile: "",
        }).save(); //promise handling. Once resolved, call done()
        done(null, user);
      }

      //create a User. .save() persists model instance to database
    }
  )
);
