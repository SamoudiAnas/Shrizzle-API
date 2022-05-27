const mongoose = require("mongoose");

const buildSchema = mongoose.Schema;

const itemSchema = buildSchema({
  name: {
    type: String,
    required: true,
  },
  interestedPeople: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Item", itemSchema);
