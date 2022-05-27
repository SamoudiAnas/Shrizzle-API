const Subscription = require("../../models/subscription");

module.exports = {
  createSubscription: async (args) => {
    //if already subscribed
    const existingSubscription = await Subscription.findOne({
      email: args.email,
    });

    if (existingSubscription) {
      throw new Error("You are already subscribed!");
    }

    try {
      //create the message
      const subscription = new Subscription({
        email: args.email,
        createdAt: new Date().toLocaleString(),
      });

      //save to db
      const result = await subscription.save();
      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  subscriptions: async () => {
    try {
      //get all the subscriptions
      const subscriptions = await Subscription.find();

      //return the value
      return subscriptions.map((subscription) => {
        return { ...subscription._doc, _id: subscription.id };
      });
    } catch (err) {
      throw err;
    }
  },
};
