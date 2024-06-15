//model/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    school: {type: String, required: true},
    interest: {type:String, required: true},
    specificInterest: {type:String, required: false},
    bio: {type:String, default: ""},
    avatar: {type:String, default:''},
  },
  {
    timestamps: true,
  }
);

//Compile to form the model
module.exports = mongoose.model("User", userSchema);
