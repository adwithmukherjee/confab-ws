const mongoose = require("mongoose");
const Schema = mongoose.Schema; //pull a value off of mongoose object

//this file is where we creat a Model Class for a User object
//ie we delineate the structure of a User.

//Schema object creates a schema/contract an object in this Collection
const meetingSchema = new Schema({
  uid: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: Date,
});

//now we create an a actual Model Class, tlling mongoose a
//new Collection needs to be created.
//parameters: (name of Collection, Schema collection uses)
mongoose.model("meetings", meetingSchema);
