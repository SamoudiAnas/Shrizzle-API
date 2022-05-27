const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  bio: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  coverPic: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  whatsapp: {
    type: String,
    required: false,
  },
  linkedIn: {
    type: String,
    required: false,
  },
  customLink: [
    {
      type: String,
      required: false,
    },
  ],
  snapshat: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  discord: {
    type: String,
    required: false,
  },
  map: {
    type: String,
    required: false,
  },
  youtube: {
    type: String,
    required: false,
  },
  tinder: {
    type: String,
    required: false,
  },
  tiktok: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isSet: {
    type: Boolean,
    required: false,
  },
  profileType: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
