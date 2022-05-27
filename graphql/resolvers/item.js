const Item = require("../../models/item");

module.exports = {
  createItem: async (args) => {
    try {
      //create the item
      const item = new Item({
        name: args.name,
      });

      //save to db
      const result = await item.save();
      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  items: async () => {
    try {
      //get all the items
      const items = await Item.find();

      //return the value
      return items.map((item) => {
        return { ...item._doc, _id: item.id };
      });
    } catch (err) {
      throw err;
    }
  },

  addInterest: async ({ name, email }) => {
    try {
      //get all the items
      const item = await Item.findOne({ name: name });

      //if we didnt find the item

      if (!item) {
        throw new Error("Item wasn't found!");
      }

      //if already interested
      item.interestedPeople.forEach((existingEmail) => {
        if (existingEmail === email) {
          throw new Error(" Already subscribed!");
        }
      });

      item.interestedPeople.push(email);

      item.save();

      //return the value
      return { ...item._doc, _id: item.id };
    } catch (err) {
      throw err;
    }
  },
};
