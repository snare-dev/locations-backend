const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 6 },
  userImg: { type: String, default: "" },
  totalPosts: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
  bio: { type: String, default: "" },
  followers: {
    type: Number,
    default: 0,
  },
  correctGuesses: {
    type: Number,
    default: 0,
  },
  credits: {
    type: Number,
    default: 10,
  },
  places: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
});

module.exports = mongoose.model("User", userSchema);
