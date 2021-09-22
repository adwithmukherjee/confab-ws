const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

//here we are exporting a function that establishes authRoutes
//with app as an argument. It allows this fn to be called
//in index.js with the Express app instantiated there
module.exports = (app) => {
  //telling passport to authenticate users on thie route with oauth
  //the 'google' string tells passport to use the GoogleStrategy above
  //scope tells Google what we want access to.

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // we need another route handler for when user visits auth/google/callback.
  //i.e. Google has sent 'code' back to server with info we can use to identify user,
  //and our server needs a route to process this request.
  //authenticate lets passport sends a request to google with 'code', and google
  //replies with info about the user. This manifests in the accessToken (above)
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log("REDIRECT: " + req.session.backTo);
      res.redirect(req.session.backTo || "/");
    }
  );

  app.post("/api/prelogin", (req, res) => {
    req.session.backTo = req.body.url;
    res.sendStatus(200);
  });
  //test route to check if cookies is working.
  //when we visit localhost:5000/api/current_user,
  //the request comes in, cookie-session extracts cookie data, passport pulls user id from cookie, deserializes it, and User model instance adds user object to req
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  //logout route
  app.get("/api/logout", (req, res) => {
    req.logout(); //this function is automatically attached to req obj by Passport
    //also means user obj is detached from req.
    console.log("logging out!");
    res.redirect("/");
  });
};
