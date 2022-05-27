//models
const Profile = require("../../models/profile");
const User = require("../../models/user");


//populate the user data
const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      personalProfile: profile.bind(this, user.personalProfile),
      businessProfile: profile.bind(this, user.businessProfile),
    };
  } catch (err) {
    throw err;
  }
};

const profile = async (profileId) => {
  try {
    const profile = await Profile.findById(profileId);
    return {
      ...profile._doc,
      _id: profile.id,
      user: user.bind(this, profile.user),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addContact: async (args, req) => {
    //check if logged in
    if (!req.isAuth) {
      return;
    }

    //check if the user doesn't exists
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      throw new Error("User wasn't found!");
    }

    const profile = await Profile.findById(args.profileId);
    if (!profile) {
      throw new Error("Personal Profile not found!");
    }

    if (user.contactList.includes(args.profileId)) {
      throw new Error("Already Added!");
    }

    user.contactList.push(profile);

    const result = await user.save();

    return {
      ...result._doc,
      personalProfile: profile.bind(this, result.personalProfile),
      businessProfile: profile.bind(this, result.businessProfile),
      password: null,
    };
  },
};
