const authResolver = require("./auth");
const userResolver = require("./user");
const profileResolver = require("./profile");
const contactResolver = require("./contact");
const messageResolver = require("./message");
const subscriptionResolver = require("./subscription");
const itemResolver = require("./item");

module.exports = {
  ...profileResolver,
  ...contactResolver,
  ...userResolver,
  ...authResolver,
  ...messageResolver,
  ...subscriptionResolver,
  ...itemResolver,
};
