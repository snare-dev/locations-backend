const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: { type: String, required: true },
  winner: { type: String, default: "" },
  totalGuesses: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  locationData: {
    type: { type: String, default: "Point" },
    coordinates: [{ type: Number, required: true }],
  },
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  creatorImg: {
    type: String,
  },
  creatorName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
