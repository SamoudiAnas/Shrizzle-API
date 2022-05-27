const mongoose = require("mongoose");

const buildSchema = mongoose.Schema;

const subscriptionSchema = buildSchema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
