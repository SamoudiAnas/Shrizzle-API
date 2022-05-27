const Message = require("../../models/message");

module.exports = {
  createMessage: async (args) => {
    try {
      //create the message
      const message = new Message({
        fullName: args.messageInput.fullName,
        email: args.messageInput.email,
        message: args.messageInput.message,
        createdAt: new Date().toLocaleString(),
      });

      //save to db
      const result = await message.save();
      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  messages: async () => {
    try {
      //get all the messages
      const messages = await Message.find();

      //return the value
      return messages.map((message) => {
        return { ...message._doc, _id: message.id };
      });
    } catch (err) {
      throw err;
    }
  },
};
