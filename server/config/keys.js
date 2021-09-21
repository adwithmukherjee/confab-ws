const { model } = require("mongoose");

//keys.js - figure out what set of credentials to return. Are we in prod or dev??
if (process.env.NODE_ENV == "production") {
  //return prod set of keys
  module.exports = require("./prod");
} else {
  //return dev keys
  module.exports = require("./dev");
}
