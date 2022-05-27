const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const planSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Plan", planSchema);
