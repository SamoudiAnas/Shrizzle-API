const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },

  personalProfile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },

  businessProfile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },

  plan: {
    type: Schema.Types.ObjectId,
    ref: "Plan",
  },

  contactList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],

  isAdmin: Boolean,
});

module.exports = mongoose.model("User", userSchema);
