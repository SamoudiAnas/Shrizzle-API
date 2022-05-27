const mongoose = require("mongoose");

const buildSchema = mongoose.Schema;

const messageSchema = buildSchema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
